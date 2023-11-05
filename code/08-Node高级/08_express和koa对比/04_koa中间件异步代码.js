const Koa = require("koa");
const axios = require("axios");

//在koa中进行异步执行遵循洋葱模型
//在koa中next()会返回一个promise，所以await会等异步请求有结果在返回执行后面的代码

const app = new Koa();
//在koa中同步代码遵循洋葱模型
app.use(async (ctx, next) => {
  console.log("koa middlewara01");
  ctx.msg = "aaa";
  //如果执行的下一个中间件是一个异步函数，·那么next默认不会等到中间件的结果·就会执行下一步操作
  //如果我们希望等待下一个异步函数的执行结果·那么需要在next函数前面加await
  await next();
  ctx.body = ctx.msg;
});

app.use(async (ctx, next) => {
  console.log("koa middlewara02");
  ctx.msg += "bbb";
  await next();
});
app.use(async (ctx, next) => {
  console.log("koa middlewara03");
  const resData = await axios.get("http://123.207.32.32:8000/home/mu1tidata");
  ctx.msg += resData.data.data.banner.list[0].title;
});

app.listen(8000, () => {
  console.log("服务开启");
});
