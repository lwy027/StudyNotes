const koa = require("koa");

//这里给我们提供的是类
const app = new koa();

//也是以中间件的方式使用，只不过回调函数中只有2个参数context/next
app.use((ctx, next) => {
  //使用body可以直接返回客户端数据
  ctx.body = "哈哈哈哈哈";
  //1.请求对象
  console.log(ctx.request); //koa封装的请求对象
  console.log(ctx.req); //Node封装的请求对象

  //2.响应对象
  console.log(ctx.respond); //koa封装的响应对象
  console.log(ctx.res); //Node封装的响应对象

  //3.其他属性
  console.log(ctx.query);

  console.log("first middlewara");

  next();
});
app.use(() => {
  console.log("second middlewara");
});

app.listen(6000, () => {
  console.log("koa服务器开始");
});
