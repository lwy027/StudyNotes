const Koa = require("koa");
const Router = require("@koa/router");
const app = new Koa();
const userRouter = new Router({ prefix: "/user" });
const fs = require("fs");
//使用jwt
const jwt = require("jsonwebtoken");
//拿到公钥和私钥,在访问时客户端保存的就是公钥，公钥是由我们的私钥生成颁发的
//这样就实现了私钥用来发布令牌，私钥用来验证令牌，提高了安全性
const privateKey = fs.readFileSync("./keys/private.key");
const publicKey = fs.readFileSync("./keys/public.key");

userRouter.get("/login", (ctx, next) => {
  const payload = { id: 111, name: "lwy" };
  //这里会根据私钥颁发签名,就不是使用以前的secretKey,提高了安全性
  const token = jwt.sign(payload, privateKey, {
    expiresIn: 600, //以秒为单位
    algorithm: "RS256", //注意：对称加密使用的是,HS256加密算法，非对称加密使用的是RS256算法
  });

  ctx.body = {
    code: 0,
    token,
    meaasge: "登录成功，可以进行其他操作",
  };
});

//2.在登录其他页面时，进行token的验证
userRouter.get("/list", (ctx) => {
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");

  try {
    //这里使用公钥进行验证令牌，就不是使用以前的secretKey
    const res = jwt.verify(token, publicKey, {
      algorithms: ["RS256"], //验证令牌时也需要, 这里传入的是一个数组，一个算法如果解密不出来使用另一种
    });
    //返回值可以拿到用户的一些信息
    console.log(res);

    ctx.body = {
      code: 1,
      message: "user list",
    };
  } catch (error) {
    console.log("res获取错误");
  }
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务开启成功~");
});
