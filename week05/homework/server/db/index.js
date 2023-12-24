const { Sequelize } = require("sequelize");
const { DataTypes, Model } = require("sequelize");

// 连接数据库
const sequelize = new Sequelize({
  dialect: "sqlite", // 数据库类型
  storage: "./db/myData.db", // 数据库文件
  logging: false, // 记录日志
  define: {
    timestamps: false, // 是否自动向表中添加createdAt(创建时间)和updatedAt(更新时间)字段
  },
});

// 创建模型
const Data = sequelize.define(
  "Data",
  {
    key: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    time: DataTypes.STRING,
  },
  {}
);

const Tags = sequelize.define(
  "Tags",
  {
    key: DataTypes.STRING,
    name: DataTypes.STRING,
  },
  {}
);

// data和tag的对应
const Class = sequelize.define(
  "Class",
  {
    TagKey: DataTypes.STRING,
    DataKey: DataTypes.STRING,
  },
  {}
);

module.exports = { sequelize, Data, Tags, Class };
