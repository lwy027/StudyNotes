const Koa = require("koa");
const Router = require("@koa/router");
const static = require("koa-static");
require("../proxy/index");
const app = new Koa();
app.use(static("./client"));

const userRouter = new Router({ prefix: "/user" });
//使用CORS
// app.use(async (ctx, next) => {
//   //1.允许简单请求开启CORS
//   //1.1 指定目标源(端口/协议/主机)访问
//   // ctx.set("Access-COntrol-Allow-Origin", "http://localhost:52330");
//   //1.2 允许全部都可以访问
//   ctx.set("Access-Control-Allow-Origin", "*");

//   //2.非简单请求需要开启下面的设置
//   ctx.set(
//     "Access-Control-Allow-Headers",
//     "Accept, AcceptEncoding, Connection, Host, Origin"
//   );
//   ctx.set("Access-Control-Allow-Credentials", true); //cookie设置
//   ctx.set(
//     "Access-Control-Allow-Methods",
//     "PUT, POST, GET, DELETE,PATCH, OPTIONS"
//   );
//   //3.发起的是一个OPTIONS请求
//   if (ctx.method === "OPTIONS") {
//     ctx.status = 204;
//   } else {
//     await next();
//   }
// });

userRouter.get("/list", (ctx, next) => {
  ctx.body = [
    { id: 110, name: "lwy", age: 20 },
    { id: 110, name: "kobe", age: 18 },
    { id: 110, name: "james", age: 30 },
    { id: 110, name: "curry", age: 25 },
  ];
});
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务器开启成功~");
});
