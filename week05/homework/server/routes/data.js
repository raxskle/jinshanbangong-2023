const Router = require("koa-router");
const { Op } = require("sequelize");

const { Data, Class, Tags } = require("../db/index");
const { getTime } = require("../utils/date");
const { v4: uuidv4 } = require("uuid");

const data = new Router();

// 查询所有
data.get("/all", async (ctx) => {
  const dataList = await Data.findAll();
  const res = await dataListWithTags(dataList);

  ctx.body = {
    data: res,
    code: 200,
  };
});

// 将data带上tags
const dataListWithTags = async (dataList) => {
  const ClassList = await Class.findAll();
  const tagsList = await Tags.findAll();

  // console.log(ClassList);
  const res = dataList.map((rawData) => {
    const tags = ClassList.filter((rawClass) => {
      // 得到该data的所有Class
      return rawClass.DataKey == rawData.key;
    }).map((rawClass) => {
      // 将Class转换为tag
      return tagsList.find((tag) => {
        return tag.key == rawClass.TagKey;
      });
    });

    return {
      ...rawData.dataValues, // 扩展需要访问.dataValues
      tags: tags, // 给data加上tags字段{key, name}
    };
  });

  return res;
};

// 条件查询
// 根据名字、tag、时间，多个tags取交集
data.get("/search", async (ctx) => {
  let { name = "", tagKeys = "[]", time = "" } = ctx.query;
  const requireTagKeys = JSON.parse(tagKeys);

  // 根据名字和时间查询
  const dataList = await Data.findAll({
    where: {
      name: { [Op.like]: "%" + name + "%" },
      time: { [Op.like]: "%" + time + "%" },
    },
  });

  // ctx.body = {
  //   data: dataList,
  //   code: 100,
  // };
  // return;

  // 查询结果
  const filtedDataList = [];

  // dataList的每个data必须拥有所有requireTagKeys
  const list = dataList.map(async (data) => {
    const c = await Class.findAll({
      where: {
        DataKey: data.key,
      },
    });
    const tagKeys = c.map((c) => c.TagKey);
    console.log("data 查询到 tagKeys", data, tagKeys);

    // 判断data的tagKeys 是否包含所有 requireTagKeys
    const isIncluded = requireTagKeys.reduce((_isIncluded, requireTagKey) => {
      return _isIncluded && tagKeys.includes(requireTagKey);
    }, true);

    // 如果data拥有所有requireTags，那么返回
    if (isIncluded) {
      // console.log("included", data.dataValues);
      filtedDataList.push(data);
    }
  });

  await Promise.all(list);
  console.log("res:::", filtedDataList);

  // data携带tags
  const result = await dataListWithTags(filtedDataList);

  ctx.body = {
    data: result,
    code: 200,
  };
});

// 增加数据
// 必须携带name， description和 tagKeys 可无
data.post("/add", async (ctx) => {
  let { name, description = "", tagKeys = [] } = ctx.request.body;
  // tagKeys = JSON.parse(tagKeys);
  // time 和 key自动生成

  // 必须包含名字不能为空
  if (!name) {
    ctx.body = {
      data: "新增数据失败",
      code: 200,
    };
    return;
  }

  // Data中增加
  const data = {
    key: uuidv4(),
    name: name,
    description: description,
    time: getTime(),
  };
  const newData = new Data(data);
  await newData.save();

  // Class中增加
  const list = tagKeys.map(async (tagKey) => {
    const newClass = new Class({
      DataKey: data.key,
      TagKey: tagKey,
    });
    return await newClass.save();
  });

  await Promise.all(list);

  ctx.body = {
    data: "新增数据成功",
    code: 200,
  };
});

// 根据key删除
data.get("/delete", async (ctx) => {
  const { key } = ctx.query;
  await Data.destroy({
    where: {
      key: key,
    },
  });

  // 删除所有Class
  await Class.destroy({
    where: {
      DataKey: key,
    },
  });

  ctx.body = {
    data: "删除数据成功",
    code: 200,
  };
});

// 修改数据
// 每次传data 和 tagKeys必须完整
data.post("/modify", async (ctx) => {
  const { data, tagKeys = [] } = ctx.request.body;
  // tagKeys = JSON.parse(tagKeys);

  // data不包含tags字段，且完整包含key，name，description，time
  await Data.update(
    { ...data },
    {
      where: {
        key: data.key,
      },
    }
  );

  // 删除所有Class
  await Class.destroy({
    where: {
      DataKey: data.key,
    },
  });

  // Class中增加
  const list = tagKeys.map(async (tagKey) => {
    const newClass = new Class({
      DataKey: data.key,
      TagKey: tagKey,
    });
    return await newClass.save();
  });

  await Promise.all(list);

  ctx.body = {
    data: "修改数据成功",
    code: 200,
  };
});

module.exports = data;
