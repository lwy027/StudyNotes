const Koa = require("koa");
const static = require("koa-static");

const app = new Koa();

app.use(static("./dist"));

app.listen(9000, () => {
  console.log("服务开启");
});
