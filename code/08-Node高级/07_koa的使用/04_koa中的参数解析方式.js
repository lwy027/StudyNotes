const Koa = require("koa");
const Router = require("@koa/router");
const bodyparser = require("koa-bodyparser");
const multer = require("koa-multer");
const app = new Koa();
const formParser = multer();

//注册中间件
app.use(bodyparser());
const userRouter = new Router({ prefix: "/users" });

//1.query解析
userRouter.get("/", (ctx, next) => {
  console.log(ctx.query);
  ctx.body = "get query";
});

//2.parmas解析
userRouter.get("/:id", (ctx, next) => {
  console.log(ctx.params.id);
  ctx.body = "get params";
});

//3.json解析 需要借助koa-bodyparser第三方中间件
//npm install koa-bodyparser;
userRouter.post("/json", (ctx, next) => {
  //在请求的body中可以拿到json数据
  console.log(ctx.request.body);
  //直接在body中拿不到数据
  // console.log(ctx.body);
  ctx.body = "get json";
});

//4.参数解析：x-www-form-urlencoded
//使用 koa-bodyparser的中间件
userRouter.post("/urlencoded", (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = "get x-www-form-urlencoded";
});

//5.body是form-data格式
//我们需要使用multer 文件上传中间件解析
//安装依赖：npm install koa-multer;
//使用 multer中间件；
userRouter.post("/formData", formParser.any(), (ctx, next) => {
  // 在req中获取数据
  console.log(ctx.req.body);
  ctx.body = "get formData";
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.listen(8000, () => {
  console.log("开启koa服务器");
});
