# 数据管理系统 demo

## 技术栈

除作业要求的所有技术栈以外，还使用了：

- vite 构建工具
- react-i18next 国际化多语言切换
- 数据库使用 sqlite3 库，使用 sequelize ORM 进行数据库模型管理
- 全局状态管理使用 redux
- 前端使用 TypeSecript 进行开发，后端使用 JavaScript

## 具体说明

对删除、修改等操作添加了弹窗确认等交互，操作结果反馈弹窗显示

基本完成了题目的所有要求，可以进行对数据的增删改查、搜索，对标签的增删改查，界面语言的切换

## 检查方法

基本按照题目要求就能跑起来

0. `npm install` 分别安装 client 和 server 项目依赖

1. 进入`/server`目录，执行命令 `npm run start` 在端口 3001 运行服务端

检查开发版本：进入`/client`目录，执行命令 `npm run start` 运行开发模式，打开 `http://localhost:3000`

检查生产版本（打包后文件已放在`server/public/dist`）： 打开 `http://localhost:3001` 进入构建好的生产版本（由于路由访问的原因请不要带上 /index.html 比如 ❌`http://localhost:3001/index.html`）
