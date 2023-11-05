const Koa = require("koa");

const app = new Koa();

app.use((ctx, next) => {
  //在request中的属性，大部分在ctx中也可以拿到
  // console.log(ctx.request.path);
  // console.log(ctx.path);

  if (ctx.path === "/users") {
    if (ctx.method === "GET") {
      ctx.body = "用户数据";
    } else {
      ctx.body = "您的请求出错";
    }
  } else if (ctx.path === "/login") {
    if (ctx.method === "POST") {
      ctx.body = "登录成功, 欢迎回来";
    } else {
      ctx.body = "请确定您的账号和密码";
    }
  }
});

app.listen(6000, () => {
  console.log("koa服务器开启成功");
});
