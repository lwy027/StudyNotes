const Router = require("@koa/router");
const loginRouter = new Router({ prefix: "/login" });
const { sign, test } = require("../controller/login.controller");
const { verifyLogin, verifyAuth } = require("../middlewara/login.middlewara");

loginRouter.post("/", verifyLogin, sign);
loginRouter.get("/test", verifyAuth, test);

module.exports = loginRouter;
