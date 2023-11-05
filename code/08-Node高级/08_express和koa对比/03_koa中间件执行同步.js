const Koa = require("koa");

const app = new Koa();
//在koa中同步代码遵循洋葱模型
app.use((ctx, next) => {
  console.log("koa middlewara01");
  ctx.msg = "aaa";
  next();
  ctx.body = ctx.msg;
});

app.use((ctx, next) => {
  console.log("koa middlewara02");
  ctx.msg += "bbb";
  next();
});
app.use((ctx, next) => {
  ctx.msg += "ccc";
  console.log("koa middlewara03");
});

app.listen(9000, () => {
  console.log("服务开启");
});
