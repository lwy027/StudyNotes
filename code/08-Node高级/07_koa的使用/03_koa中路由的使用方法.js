const Koa = require("koa");
//导入@koa/router
const koaRouter = require("@koa/router");

const app = new Koa();
//路由的使用
//1.创建路由对象
const usersRouter = new koaRouter({ prefix: "/users" });

//2.在路由中创建中间件
usersRouter.get("/", (ctx, next) => {
  ctx.body = "get users list data";
});
usersRouter.post("/:id", (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = " post users list data" + id;
});
usersRouter.delete("/:id", (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = "delete users list data" + id;
});
usersRouter.patch("/:id", (ctx, next) => {
  const id = ctx.params.id;
  ctx.body = "change list data" + id;
});

//让路由中间件生效，相当于在内部，路由的中间件都是放在routes中的
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods()); //如果客户端请求的方法我们没有实现，那么通过这个中间件会报错

app.listen(8000, () => {
  console.log("koa的服务开启");
});
