const Koa = require("koa");
const Router = require("@koa/router");
const koaSession = require("koa-session");
const app = new Koa();

const userRouter = new Router({ prefix: "/user" });

//对session进行一些设置
const session = koaSession(
  {
    key: "sessionid", //cookie的key
    maxAge: 5 * 1000, //过期时间
    httpOnly: true, //不允许通过js获取cookie
    rolling: true, //每次响应时，刷新cookie的有效期
    signed: true, //是否使用signed签名认证，防止数据被篡改
  },
  app
); //需要把app传入,koaSession中会用到app

//加盐操作:对加密操作进行中间处理，这样在加密操作时，就会根据这些keys进行加密
app.keys = ["aaa", "bb", "lwy"];

//注册为中间件
app.use(session); //目的：可以在ctx中拿到session

userRouter.get("/login", (ctx, next) => {
  //在服务器中为登录的客户端设置一个cookie
  ctx.session.slogan = "ikun";

  ctx.body = "登录成功~";
});

userRouter.get("/list", (ctx) => {
  //从session中拿数据
  const value = ctx.session.slogan;
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
