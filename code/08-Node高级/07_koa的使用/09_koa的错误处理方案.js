const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();
const userRouter = new Router({ prefix: "/user" });

userRouter.post("/", (ctx, next) => {
  //真实项目中根据数据库查询返回
  let islogin = false;
  if (islogin) {
    ctx.body = "登录成功，欢迎回来";
  } else {
    //错误处理
    //在ctx中有一个app就是我们的Koa对象，它又是一个EventEmitter所以可以发出一个error事件
    //我们利用这个错误事件发出错误码处理事件
    ctx.app.emit("error", -1002, ctx);
  }
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

//对事件进行处理
//独立的文件 error_handle.js
app.on("error", (code, ctx) => {
  const errCode = code;
  let message = "";
  switch (errCode) {
    case -1001:
      message = "账号或密码错误";
      break;
    case -1002:
      message = "请求参数不正确";
      break;
    case -1003:
      message = "未授权,请检查您的token信息";
      break;
  }

  const body = {
    code: errCode,
    message,
  };
  ctx.body = body;
});

app.listen(9000, () => {
  console.log("服务开启成功");
});
