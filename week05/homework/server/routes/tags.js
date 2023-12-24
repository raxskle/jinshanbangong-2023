const Router = require("koa-router");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const { Tags, Class } = require("../db/index");

const tags = new Router();

// 查询所有Class
tags.get("/class", async (ctx) => {
  const res = await Class.findAll();

  ctx.body = {
    data: res,
    code: 200,
  };
});

// 查询所有tags
tags.get("/all", async (ctx) => {
  const tagList = await Tags.findAll();

  ctx.body = {
    data: tagList,
    code: 200,
  };
});

// 增加tags
tags.post("/add", async (ctx) => {
  const { name } = ctx.request.body;

  if (!name) {
    ctx.body = {
      data: "新增标签失败",
      code: 200,
    };
    return;
  }

  const key = uuidv4();

  const tag = {
    name: name,
    key: key,
  };

  const newTag = new Tags(tag);
  await newTag.save();

  ctx.body = {
    data: "新增标签成功",
    code: 200,
  };
});

// 删除tag 根据key
tags.get("/delete", async (ctx) => {
  const { key } = ctx.query;
  if (!key) {
    ctx.body = {
      ok: false,
      data: "删除tag失败",
      code: 200,
    };
    return;
  }

  const ClassList = await Class.findAll({
    where: {
      TagKey: key,
    },
  });

  // 如果Tag被使用则不能删除
  if (ClassList.length > 0) {
    ctx.body = {
      ok: false,
      data: "无法删除已使用的Tag",
      code: 200,
    };
    return;
  }

  await Tags.destroy({
    where: {
      key: key,
    },
  });

  ctx.body = {
    ok: true,
    data: "删除tag成功",
    code: 200,
  };
});

// 修改tag的 name
tags.post("/modify", async (ctx) => {
  const { tag } = ctx.request.body;

  const res = await Tags.update(
    { name: tag.name },
    {
      where: {
        key: tag.key,
      },
    }
  );

  ctx.body = {
    data: res,
    msg: "修改Tag",
    code: 200,
  };
});

module.exports = tags;
