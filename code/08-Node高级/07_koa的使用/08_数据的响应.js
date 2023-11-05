const Koa = require("koa");
const Router = require("@koa/router");
const fs = require("fs");

const app = new Koa();
const userRouter = new Router({ prefix: "/user" });

//数据的响应
userRouter.post("/", (ctx, next) => {
  //1.string ：字符串数据
  ctx.body = "user get list";

  //2.Buffer ：Buffer数据
  ctx.body = Buffer.from("你好啊");

  const readStream = fs.createReadStream("./dist/img/license.d1b53495.png");
  //3.Stream ：流数据
  //默认客户端访问图片的是乱码，需要设置type
  ctx.type = "image/jpeg";
  ctx.body = readStream;

  //4.Object|| Array：对象或者数组
  ctx.body = [
    {
      id: 1,
      name: "lwy",
      age: 20,
    },
  ];

  //5.null ：不输出任何内容
  //如果response.status尚未设置，Koa会自动将状态设置为200或204。
  //如果为空返回204状态码
  ctx.status = 201;
  ctx.body = null;
});

app.use(userRouter.routes());
console.log(userRouter.allowedMethods());
app.listen(8000, () => {
  console.log("服务器开启成功~");
});
