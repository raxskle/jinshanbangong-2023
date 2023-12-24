const Koa = require("koa2");
const cors = require("koa2-cors");
const path = require("path");
const staticw = require("koa-static");
const Router = require("koa-router");
const fs = require("fs");

const { sequelize } = require("./db/index");

const app = new Koa();

const port = 3001;

// 允许跨域
app.use(cors());

// 使用post参数
const koaBody = require("koa-body");
app.use(
  koaBody({
    multipart: true,
  })
);

// 数据库同步
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// 配置vue-router 当404 且是某些路由时返回index.html
app.use(async (ctx, next) => {
  // history 中间件
  const path = "index.html"; // 需要判断的路径
  await next(); // 等待请求执行完毕

  ctx.set("Access-Control-Allow-Origin", "*");
  if (ctx.response.status === 404) {
    // 判断是否符合条件
    if (!ctx.request.url.includes(path)) {
      ctx.type = "text/html; charset=utf-8"; // 修改响应类型
      ctx.body = fs.readFileSync("./public/dist/index.html"); // 修改响应体，返回index.html
    }
  }
});

const api = require("./routes/index");
const router = new Router();
router.use("/api", api.routes(), api.allowedMethods());
app.use(router.routes(), router.allowedMethods());

// 开放静态资源目录
app.use(staticw(path.join(__dirname + "/public/dist"), {}));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
