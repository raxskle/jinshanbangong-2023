const Router = require("koa-router");

const router = new Router();

const data = require("./data");
const tags = require("./tags");

router.use("/data", data.routes(), data.allowedMethods());
router.use("/tags", tags.routes(), tags.allowedMethods());

module.exports = router;
