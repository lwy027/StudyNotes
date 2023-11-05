const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();

const userRouter = new Router({ prefix: "/user" });

userRouter.get("/login", (ctx, next) => {
  //设置cookies
  //前2个参数为key 和value,第3个参数用来设置cookies的作用域过期时间
  ctx.cookies.set("slogan", "ikun", {
    maxAge: 60 * 1000,
  });
  ctx.body = "登录成功~";
});

userRouter.get("/list", (ctx) => {
  const value = ctx.cookies.get("slogan");
  if (value === "ikun") {
    ctx.body = "user list data";
  } else {
    ctx.body = "你没有对应的权限访问";
  }
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务开启成功~");
});
