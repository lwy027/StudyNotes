const Koa = require("koa");
const Router = require("@koa/router");
const app = new Koa();
const userRouter = new Router({ prefix: "/user" });
//使用jwt
const jwt = require("jsonwebtoken");
//自己设置进行加密时额外的key,会根据这个key进行算法加密
const secretKey = "aaabbbXXXXXX";
userRouter.get("/login", (ctx, next) => {
  //1.在用户登录时进行token的颁发
  //第一个参数是携带的数据，第二个参数是我们自己设置的key值，jwt会根据我们这个key和其他的算法生成一个token
  //第3个参数可以设置一些额外的信息，比如token的生效时间
  const payload = { id: 111, name: "lwy" };
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 600, //以秒为单位
  });
  //{生成的token
  //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTExLCJuYW1lIjoibHd5IiwiaWF0IjoxNjk4NzUxODc0LCJleHAiOjE2OTg3NTI0NzR9.ab1DiTjN-o_HO_KQc55heRUUonQN86yz_PAEGphFs6I"
  // }
  ctx.body = {
    code: 0,
    token,
    meaasge: "登录成功，可以进行其他操作",
  };
});

//2.在登录其他页面时，进行token的验证
userRouter.get("/list", (ctx) => {
  //1. 获取客户端携带的token
  //通常把token放在headers的authorization的bearer中
  //2. 拿到的信息是带Bearer的，所以我们需要对字符进行替换
  //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTExLCJuYW1lIjoibHd5IiwiaWF0IjoxNjk4NzUxODc0LCJleHAiOjE2OTg3NTI0NzR9.ab1DiTjN-o_HO_KQc55heRUUonQN86yz_PAEGphFs6I
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");

  //3. 用户的token可能是无效或者被篡改的所以我们需要对token进行验证操作
  try {
    //验证时需要token和secretKey
    const res = jwt.verify(token, secretKey);
    //返回值可以拿到用户的一些信息
    console.log(res);

    ctx.body = {
      code: 1,
      message: "user list",
    };
  } catch (error) {
    ctx.body = {
      code: -1001,
      message: "token过期，无效的token",
    };
  }
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务开启成功~");
});
