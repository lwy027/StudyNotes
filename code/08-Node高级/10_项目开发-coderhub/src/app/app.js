const Koa = require("koa");
const app = new Koa();
const userRouter = require("../router/user.router");
const bodyParser = require("koa-bodyparser");

app.use(bodyParser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

module.exports = app;
