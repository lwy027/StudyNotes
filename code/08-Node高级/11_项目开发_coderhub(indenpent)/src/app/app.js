const Koa = require("koa");
const userRouter = require("../router/user.router");
const bodyparser = require("koa-bodyparser");

const app = new Koa();

app.use(bodyparser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

module.exports = app;
