### 1.使用koa结合router进行项目搭建









### 2.对项目路由, app,进行分层处理







### 3.搭建创建用户接口





### 4.把创建的用户使用mysql2放入数据库，并且对数据库的操作进行分层处理

mysql在node中使用

```js
const mysql = require("mysql2");

//1.创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "coderhub",
  user: "root",
  password: "Liweiye123456",
  connectionLimit: 5,
});

//2.判断连接是否成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("数据库连接失败", err);
    return;
  }

  //connect是和连接池连接的一个连接
  connection.connect((err) => {
    if (err) {
      console.log("和数据库交互失败", err);
    } else {
      console.log("和数据库连接成功");
    }
  });
});

const connection = connectionPool.promise();

module.exports = connection;

```

创建用户

````js
const useService = require("../app/database");

class userController {
  //用户数据库操作
  async create(ctx, next) {
    //1.获取用户信息
    const user = ctx.request.body;
    // 2.连接数据库，进行信息保存
    const result = await useService.create(user);

    //3.返回创建成功信息
    ctx.body = {
      message: "创建用户信息成功",
      data: result,
    };
  }
}

module.exports = new userController();

````





### 5.在放入数据库之前对用户信息进行判断



####  5.1 如果用户账号密码没有输入完全提示错误信息



#### 5.2. 对用户名进行判断，如果用户名在数据库中存在，提示错误信息并返回

用户认证中间件

```js
const useService = require("../app/database");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXITS,
} = require("../config/error");

const verifyUser = async (ctx, next) => {
  //1.获取用户信息
  const user = ctx.request.body;
  const { name, password } = user;
  //2.首先对name,password进行判断在数据库中是否存在
  //2.1如果name或者password为空，直接返回

  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  //2.2 根据name向数据库查询是否存在，如果存在则不添加
  const users = await useService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXITS, ctx);
  }
  await next();
};

module.exports = verifyUser;

```





### 6.对错误处理注册为中间件，并且使用emitter方式进行错误判断逻辑处理

错误处理

```js
const app = require("../app/app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXITS,
} = require("../config/error");
 //进行事件接收进行处理
app.on("error", (err, ctx) => {
  let code = 0;
  let message = "";
  switch (err) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001;
      message = "账号或密码为空~";
      break;
    case NAME_IS_ALREADY_EXITS:
      code = -1002;
      message = "账号已存在，请重新输入";
      break;
  }

  ctx.body = {
    code,
    message,
  };
});

```

进行错误处理的中间件

```js
const useService = require("../app/database");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXITS,
} = require("../config/error");

const verifyUser = async (ctx, next) => {
  //1.获取用户信息
  const user = ctx.request.body;
  const { name, password } = user;
  //2.首先对name,password进行判断在数据库中是否存在
  //2.1如果name或者password为空，直接返回

  if (!name || !password) {
      //利用emit进行事件发出，
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  //2.2 根据name向数据库查询是否存在，如果存在则不添加
  const users = await useService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXITS, ctx);
  }
  await next();
};

module.exports = verifyUser;

```



### 7.对用户密码进行加密

使用node内置的crypto进行加密

1.密码加密操作

```js
//1.使用crypto,node内置的加密库
const crypto = require("crypto");

function md5password(password) {
  //使用md5加密
  const md5 = crypto.createHash("md5");

  //对密码进行加密,并且使用16进制储存
  const md5pwd = md5.update(password).digest("hex");
  return md5pwd;
}

module.exports = md5password;

```

2.对密码进行处理

```js
const handlePassword = async (ctx, next) => {
  //1. 取出密码
  const { password } = ctx.request.body;

  //2. 对密码进行加密
  ctx.request.body.password = md5password(password);

  await next();
};
```





### 为什么需要登录凭证呢？

- **web开发中，我们使用最多的协议是http，但是http是一个无状态的协议。**
  - 无状态的协议？什么叫做无状态协议呢？
- **举个例子：**
- **我们登录了一个网站 www.coderhub.com;**
- **登录的时候我们需要输入用户名和密码：比如用户名coderwhy，密码：Coderwhy666.;**
- **登录成功之后，我们要以coderwhy的身份去访问其他的数据和资源，还是通过http请求去访问。**
  - coderhub的服务器会问：你谁呀？
  - coderwhy说：我是coderwhy呀，刚刚登录过呀；
  - coderhub：怎么证明你刚刚登录过呀？
  - coderwhy说：这。。。，http没有告诉你吗？
  - coderhub：http的每次请求对我来说都是一个单独的请求，和之前请求过什么没有关系。
- **看到了吧？这就是http的无状态，也就是服务器不知道你上一步做了什么，我们必须得有一个办法可以证明我们**

### 认识cookie

- **Cookie（复数形态Cookies），又称为“小甜饼”。类型为“小型文本文件”，某些网站为了辨别用户身份而存储在用户本地**
  **终端（Client Side）上的数据。**
  - 浏览器会在特定的情况下携带上cookie来发送请求，我们可以通过cookie来获取一些信息；
- **Cookie总是保存在客户端中，按在客户端中的存储位置，Cookie可以分为内存Cookie和硬盘Cookie。**
  - **内存Cookie**由浏览器维护，保存在内存中，浏览器关闭时Cookie就会消失，其存在时间是短暂的；
  - **硬盘Cookie**保存在硬盘中，有一个过期时间，用户手动清理或者过期时间到时，才会被清理；
- **如果判断一个cookie是内存cookie还是硬盘cookie呢？**
  - 没有设置过期时间，默认情况下cookie是内存cookie，在关闭浏览器时会自动删除；
  - 有设置过期时间，并且过期时间不为0或者负数的cookie，是硬盘cookie，需要手动或者到期时，才会删除；

#### cookie常见的属性

- **cookie的生命周期：**
- **默认情况下的cookie是内存cookie，也称之为会话cookie，也就是在浏览器关闭时会自动被删除；**
- **我们可以通过设置expires或者max-age来设置过期的时间；**
  - **expires**：设置的是Date.toUTCString()，设置格式是;expires=date-in-GMTString-format；
  - **max-age**：设置过期的秒钟，;max-age=max-age-in-seconds (例如一年为60*60*24*365)；
- **cookie的作用域：（允许cookie发送给哪些URL）**
- **Domain：指定哪些主机可以接受cookie**
  - 如果不指定，那么默认是 **origin，不包括子域名。**
  - 如果**指定Domain**，则**包含子域名**。例如，如果设置 Domain=mozilla.org，则 Cookie 也包含在子域名中（如developer.mozilla.org）。
- **Path：指定主机下哪些路径可以接受cookie**
  - 例如，设置 Path=/docs，则以下地址都会匹配：
    - /docs
    -  /docs/Web/
    - /docs/Web/HTTP

#### 客户端设置cookie

- **js直接设置和获取cookie：**

```js
console.log(document.cookie);
```

- **这个cookie会在会话关闭时被删除掉；**

```js
//设置过期时间就是本地cookie,不设置就是内存cookie
document.cookie "name=coderwhy";
document.cookie "age=18";
```

- **设置cookie，同时设置过期时间（默认单位是秒钟）**

```js
document.cookie "name=coderwhy;max-age=10";
```

#### 服务器设置cookie

```js
const Koa = require("koa");
const Router = require("@koa/router");

const app = new Koa();

const userRouter = new Router({ prefix: "/user" });

userRouter.get("/login", (ctx, next) => {
  //设置cookies
  //前2个参数为key 和value,第3个参数用来设置cookies的作用域过期时间
    //没有时间的是会话cookies,默认浏览器关闭时就会销毁
    //设置了maxAge的是，硬盘cookies,会根据设置的时间销毁
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

```

> 1.服务器设置cookie
> 2.客户端（浏览器）获取服务器设置的cookie,并且做一个保存
> 3.在同一个作用域下进行访问（域名/路径），会自动携带cookie 
> 4.服务器可以通过客户端携带的cookie验证用户的身份

### Session基于cookie实现机制

使用kockies时，它的存储方式是明文的这样很不安全，所以使用session可以达到加密的效果

- **在koa中，我们可以借助于 koa-session 来实现session认证：**

```js
const koaSession = require("koa-session");


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
```

> 经过上面的操作，我们的session就会变成加密的，提高了安全性
>
> 使用session比cookie更加安全

### 认识token

- **cookie和session的方式有很多的缺点：**
  - Cookie会**被附加在每个HTTP请求**中，所以无形中**增加了流量**（事实上某些请求是不需要的）；
  - Cookie是**明文传递**的，所以存在安全性的问题；
  - Cookie的**大小限制是4KB**，对于复杂的需求来说是不够的；
  - 对于**浏览器外的其他客户端**（比如iOS、Android），**必须手动的设置cookie和session；**
  - 对于**分布式系统和服务器集群**中**如何可以保证其他系统也可以正确的解析session？**
- **所以，在目前的前后端分离的开发过程中，使用token来进行身份验证的是最多的情况：**
  - token可以翻译为**令牌**；
  - 也就是在**验证了用户账号和密码正确的情况**，给**用户颁发一个令牌；**
  - 这个令牌**作为后续用户访问一些接口或者资源的凭证；**
  - 我们可以**根据这个凭证来判断用户是否有权限来访问；**
- **所以token的使用应该分成两个重要的步骤：**
  - **生成token**：登录的时候，颁发token；
  - **验证token**：访问某些资源或者接口时，验证token

#### JWT实现Token机制

- **JWT生成的Token由三部分组成：**
- **header**
  - alg：采用的加密算法，默认是 HMAC SHA256（**HS256**），**采用同一个密钥进行加密和解密**；
    - 采用对称加密
  - typ：JWT，固定值，通常都写成JWT即可；
  - 会通过base64Url算法进行编码；
- **payload**
  - 携带的数据，比如我们可以将用户的id和name放到payload中；
  - 默认也会携带iat（issued at），令牌的签发时间；
  - 我们也可以设置过期时间：exp（expiration time）；
  - 会通过base64Url算法进行编码
- **signature**
  - 设置一个**secretKey**，通过将前两个的结果合并后进行HMACSHA256的算法；
  - HMACSHA256(base64Url(header)+.+base64Url(payload), secretKey);
  - **但是如果secretKey暴露是一件非常危险的事情，因为之后就可以模拟颁发token，也可以解密token；**

![jwt实现token](../../00_Image/08_Node/JWT实现token.png)

```js
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
   
  }
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务开启成功~");
});

```

> 在真实开发中，我们可以直接使用一个库来完成： jsonwebtoken；

#### 非对称加密

- **前面我们说过，HS256加密算法一旦密钥暴露就是非常危险的事情：**
  - 比如在分布式系统中，每一个子系统都需要获取到密钥；
  - 那么拿到这个密钥后这个子系统既可以发布令牌，也可以验证令牌；
  - 但是对于一些资源服务器来说，它们只需要有验证令牌的能力就可以了；
- **这个时候我们可以使用非对称加密，RS256：**
  - 私钥（private key）：用于发布令牌；
  - 公钥（public key）：用于验证令牌；
- **我们可以使用openssl来生成一对私钥和公钥：**
  - Mac直接使用terminal终端即可；
  - Windows默认的cmd终端是不能直接使用的，建议直接使用git bash终端

```shell
openssl
> genrsa -out private.key 2048 (2048是长度)  //生成私钥，输出在private.key文件)
> rsa -in private.key -pubout -out public.key  //根据私钥生成公钥 输出在public.key文件
```

生成的private.key

```js
-----BEGIN RSA PRIVATE KEY-----
MIIEpQIBAAKCAQEAoNHDblPBgvQUhXyqV4A0gQEhzcuK03vqYGbb3r22QDQcNjlD
3Xm0A3y+Ycf0hT1kJE4lQJRz554MqTlLaGFHwOI86QygzTFqCyZiN+5wh1kKPv1X
QE9ERkfLK+ldoCGARXjLIwlkUUCl7dRXgqdLtGnbeci2hpOgj2LosOWEgY/H5gK6
7D7NyXnNhmK2eVwNTFyfM+GNCp5MoOMzHCNtA+0ZKFg0P8X9OnbucDiBP+hGhbzb
HzeGrEDx67jE7hjK7B8LwDZp55eZTUc4swwZ/bbKhKOrFh1LF8Wr+FbqX3BjXx1V
F1omJj0uCqLbdQVc9klNnXxv/VJ7n7Oxxmo/owIDAQABAoIBAQCXsEOeNPI6Cu+w
WT5y+kKLy/2Ol4aCpEcWVu7c0iStunlBzBHvPXRGNct9f5Vsd9OVSwBoQZ5xweo/
VAOEmP2NOdgqGfcylIFpsvLBvu31PE8lyuAZkKrdf6pr6Nqex/qtjJpOmfU9jrTz
923zlskZix+xZ1iC54xysuC4ukSZzv3/LrzNPgmeDAnQiDIYhRPPCV8DW9rKQsMw
cmTE+XrZ9wjuEeo0H2bub11gSWsmAkuSsJ30RrjSVwu5sL4TVNoRH4FHmB01wfb0
uLA8Qju17jWV1e6rhVpmy6ndrc9VnpdqGkjt6mBI+md+grVcZZw8XeEGFze+hrkN
l+RMW5rBAoGBAMwAzpIk1eHl6FcQjY36eX8NTf4p6By1rEJtxoBFCzq2qQxsQKjt
vTW0oSTNO8wBHFHIRfJA9I2/blCV6KstJXI23xkdpGSszxpZn+cpRMgmDphk+L8D
jA6Qz8By5YV/cmnCzuMiVX0OVstuJqBYlYjnDb35i99nRHbuyI2aiaWNAoGBAMnP
N/PrT8exhIJeTTZoU5RKzAtvTxbJpDoG5I3FC6yBmrUVTQQOcPZg3lHOB1yflOto
5dx9gD4p4gtAKP2s3H9Hx6QFGE/ZN5AvY7YrHUKzeHCoURYkcPFWM07oTlI1T9pd
lUyEyo6TM2lusI+p/dLK16Zq9EBR8dNw8IAoTLXvAoGAEcL4OU0vug1UX1A3oubt
8RvtcHWhme5PYzE/mSdpxODmcwhx0MNyN9zUMuoTjL2EA7LWNDNnl3fVWPrUWSMD
IaCZaAxmpcVN+tNW0r+LF4oIt0gDSE48wX/mNrFKPodMJN0rOidhHhRDhk6+2jMc
QeEsFyBFB1xsX5aGq52K4nkCgYEAx7mJCqIrxtps5gkmKV5+uRh9cCOtBkRxf+wq
bhRBRWzPC8AVBJq2OWANJrDcoFJfM8wREXIzZVJWIARTjRty7ZTAhBd2xC+Zydzc
tgFdaBHudLBf76YJEQ/an5FRUhLpAJf1llEllo0gKIwfuU7noaKWYmEfcjinODdi
DbPUl4kCgYEAy3AySVlzbP1j/UNe2Osztwb8ZYVn+XjmpoYY2HPnY6fMaG5vcfbH
CJ2p2HeTNNYEE/whBUoUg1aQz2UNTnMBTOC8L60kZf8O7wW51BsrlcZq8brYnuDX
ZIpMwiulLGj6ZuA8lOJL+DM2ld5zeevwm91adu84///9jPGncv1djYM=
-----END RSA PRIVATE KEY-----

```

生成的public.key

```js
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoNHDblPBgvQUhXyqV4A0
gQEhzcuK03vqYGbb3r22QDQcNjlD3Xm0A3y+Ycf0hT1kJE4lQJRz554MqTlLaGFH
wOI86QygzTFqCyZiN+5wh1kKPv1XQE9ERkfLK+ldoCGARXjLIwlkUUCl7dRXgqdL
tGnbeci2hpOgj2LosOWEgY/H5gK67D7NyXnNhmK2eVwNTFyfM+GNCp5MoOMzHCNt
A+0ZKFg0P8X9OnbucDiBP+hGhbzbHzeGrEDx67jE7hjK7B8LwDZp55eZTUc4swwZ
/bbKhKOrFh1LF8Wr+FbqX3BjXx1VF1omJj0uCqLbdQVc9klNnXxv/VJ7n7Oxxmo/
owIDAQAB
-----END PUBLIC KEY-----
```

使用非对称加密生成的token

```js
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTExLCJuYW1lIjoibHd5IiwiaWF0IjoxNjk4ODIwMjUyLCJleHAiOjE2OTg4MjA4NTJ9.ljtIEWGvxLclnKzbS_EP23pPwT78NrivfjqpOgikEr9JpZvLMkbwvm04Cm45QE53CYW_TVnh5vGkDd_E98zC0SgEAQ67YYhJS2bTxpJ0dNQUUbGrRbocU9DDJgGuSPC75Z_2_AVGRZPL88_nfNIlW67SlgQxJqg8OVLjUsTH6uYU-vSyuRC1yLbtRZE9UG5dTqIcFyQMkJQmjXrIFncPUP_1viPEM7zZIOY6SSJyl4uGsgmg0Y89QN3796Bs-VJssbyv6xnHc8_6gLOcwIj6lXW1VLvcFe25aQgFf1JX5wJLwnwmkAoeryZBEdeLznDswlsyf73KgO79iPUAF56Dkg
```

代码实现

```js
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

```

> 在用户登录时，我们可以使用用户的登录凭证判断，用户是否由对应的权限进行
>
> 1.我们可以使用cookie的方式对用户的身份进行判断
>
> 每一次发起网络请求时，cookie都会被携带，这样在进行不同请求时我们可以根据携带的cookie进行判断
>
> 但是cookie有很多缺点，所以可以使用session
>
> 2.session是基于cookie实现的只不过在保存信息时，session对用户信息进行了一些加密操作
>
> 3.上面的方式在进行分布式系统验证和服务器集群时，进行cookie验证时仍然是很麻烦的
>
> 所以现在基本使用token的方式，进行验证
>
> token就是在验证用户名和密码成功时，给用户颁发一个令牌进行登录，并且使用对称加密方式，在用户登录时传入一个secretKey进行加密，验证时，也使用这个进行验证，但是当我们进行分布式系统验证时，如果还是这种方式，就意味这，我们的每一台服务器都可以进行验证和颁发token，这样当被人直到了我们的secretKey时，这仍然存在很大的安全问题
>
> 所以最终方案时使用非对称加密，使用openssl生成一个私钥和公钥，公钥是我们的私钥进行生成颁发的，用户进行验证时使用公钥即可，这样只要我们把私钥保存好，就解决了以前的缺点提高了安全性

### 8.用户登录逻辑处理

1.注册用户模块

```js
const Router = require("@koa/router");
const loginRouter = new Router({ prefix: "/login" });
const { sign } = require("../controller/login.controller");
const { verifyLogin } = require("../middlewara/login.middlewara");

loginRouter.post("/", verifyLogin, sign);

module.exports = loginRouter;
```

2.对用户身份进行验证

```js
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXITS,
  PASSWORD_IS_NOT_INCORRECT,
} = require("../config/error");
const useServeice = require("../app/database");
const md5password = require("../utils/md5_password");
const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  //1.判断用户名或密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  //2.判断用户名是否存在
  const users = await useServeice.findUserByName(name);

  const user = users[0];

  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXITS, ctx);
  }
  //3判断密码是否正确
  if (user.password != md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_NOT_INCORRECT, ctx);
  }
  //执行下一个中间件
  ctx.user = user;
  await next();
};

module.exports = { verifyLogin };

```

3.给用户颁发token

```js
const jwt = require("jsonwebtoken");
const { PRIVATE_KEY, PUBLIC_KEY } = require("../config/secretKey");

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 24 * 30,
      algorithm: "RS256",
    });
    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        token,
      },
    };

  }
}

module.exports = new LoginController();

```

4.验证token操作

```js
loginRouter.get("/test", verifyAuth, test);
```

```js

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = res;
    await next();
  } catch (error) {
    ctx.app.emit("error", USER_IS_NOT_ANTHORIZATION, ctx);
  }
};
```

```js
 test(ctx, next) {
    //对token进行验证
    const { id, name } = ctx.user;

    ctx.body = {
      code: 0,
      data: {
        id,
        name,
      },
    };
  }
```

### 9.动态注册所有的路由对象

```js
const fs = require("fs");

function register(app) {
  //1.拿到当前目录下的文件
  const files = fs.readdirSync(__dirname);
  console.log(files);
  //2.对当前目录下文件进行遍历，进行动态路由注册
  for (let file of files) {
      //只要后缀是.router.js的才会注册
    if (!file.endsWith(".router.js")) continue;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}

module.exports = register;

```

### 10.动态接口开发

#### 10.1创建动态

1.动态路由

```js
const Router = require("@koa/router");
const { verifyAuth } = require("../middlewara/login.middlewara");
const { create } = require("../controller/content.controller");

const contentRouter = new Router({ prefix: "/content" });

contentRouter.post("/", verifyAuth, create);
module.exports = contentRouter;
```

2.发布动态时，都需要对当前用户的身份进行token验证，每个人在登录时，都会根据它的id和name通过私钥的方式进行token的颁发，验证时使用公钥进行token的验证

```js
const contentService = require("../service/content.service");

class contentController {
  async create(ctx, next) {
    //1.获取动态内容
    const { content } = ctx.request.body;
    //2.动态由谁发布
    const { id } = ctx.user;
    //3.执行数据库
    const res = await contentService.create(content, id);
    //4.创建成功
    ctx.body = {
      code: 0,
      data: {
        message: "创建动态成功~",
        res,
      },
    };
  }
}

module.exports = new contentController();

```

3.执行数据库进行动态的插入，插入的动态与当前登录用户的id绑定

```js
const contentService = require("../service/content.service");

class contentController {
  async create(ctx, next) {
    //1.获取动态内容
    const { content } = ctx.request.body;
    //2.动态由谁发布
    const { id } = ctx.user;
    //3.执行数据库
    const res = await contentService.create(content, id);
    //4.创建成功
    ctx.body = {
      code: 0,
      data: {
        message: "创建动态成功~",
        res,
      },
    };
  }
}

module.exports = new contentController();
```

#### 10.2查询全部动态

1.创建路由

```js
contentRouter.get("/", list);
```

2.使用中间件

```js
 async list(ctx, next) {
    //数据库查询
    const { offset, size } = ctx.query;
    const res = await contentService.getQueryList(offset, size);
    ctx.body = {
      code: 0,
      data: {
        message: "获取列表成功",
        res,
      },
    };
```

3.查询数据库

```js
  async getQueryList(offset, size) {
    const statement = `SELECT c.content c, c.id id, c.createAt createTime, c.updataAt updataTime, JSON_OBJECT( 'id', u.id , 'name', u.name) user FROM content c LEFT JOIN user u ON u.id = c.user_id GROUP BY c.id LIMIT ?, ?;`;

    const [result] = await connection.execute(statement, [offset, size]);
    return result;
  }
```

#### 10.3根据id查询动态详情

1.创建路由

```js
contentRouter.get("/:id", detail);
```

2.创建中间件

```js
  async detail(ctx, next) {
    //根据id查询动态详情
    const { id } = ctx.params;
    const res = await contentService.getListById(id);

    ctx.body = {
      code: 0,
      data: {
        res,
      },
    };
  }
```

3.查询数据库

```js
 async getListById(Id) {
    const statement = `SELECT  
    c.content c, c.id id, c.createAt createTime, c.updataAt updataTime, JSON_OBJECT( 'id', u.id , 'name', u.name) user
   FROM content c LEFT JOIN user u ON u.id = c.user_id WHERE c.id = ?;`;

    const [result] = await connection.execute(statement, [Id]);
    return result[0];
  }
```

#### 10.4 更改动态的操作

1.创建路由

```js
//改 这样更改是不好的，因为当前用户可能会更改别人的动态，所以我们应该加上权限认证的操作
// contentRouter.patch("/:contentId", verifyAuth, updata);
contentRouter.patch("/:contentId", verifyAuth, verifyPermission, updata);
```

2.对当前用户的权限进行判断，是否可以更改当前的动态

```js
//这里应该根据当前动态的id和它所关联的用户id结合相查询
const { OPERATION_IS_NOT_ALLOWED } = require("../config/error");
const permissionService = require("../service/permissionService");

//如果联合查询有结果，那么允许通过，如果没有提示没有对应权限
const verifyPermission = async (ctx, netx) => {
  const { contentId } = ctx.params;
  const { id } = ctx.user;
  //数据库查询当前动态id和用户id是否匹配
  const isPermission = await permissionService.checkMoment(contentId, id);
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }
  await netx();
};

module.exports = verifyPermission;

```

4.进行更新操作

```js
 async updata(ctx, next) {
    const { contentId } = ctx.params;
    const { content } = ctx.request.body;
    //查询数据库
    const res = await contentService.updataById(content, contentId);
    ctx.body = {
      code: 0,
      message: "更改成功",
      data: { res },
    };
  }
```

5.数据库操作

```js
  //根据id更改数据库
  async updataById(content, id) {
    const statement = "UPDATE content SET content = ? WHERE id = ?;";
    const res = await connection.execute(statement, [content, id]);
    return res;
  }
```

#### 10.5删除操作

1.创建路由

```js
//删
contentRouter.delete(
  "/:contentId",
  verifyAuth,
  verifyContentPermission,
  deleteContent
);
```

2.进行删除操作

```js
async deleteContent(ctx, next) {
    const { contentId } = ctx.params;
    console.log(contentId);
    //查询数据库
    const res = await contentService.deleteById(contentId);
    ctx.body = {
      code: 0,
      message: "删除成功",
      data: { res },
    };
  }
```

3.执行数据库

```js
  //根据id删除数据库
  async deleteById(id) {
    const statement = "DELETE FROM content WHERE id = ?;";
    const [res] = await connection.execute(statement, [id]);
    return res;
  }
```

### 11.把权限验证操作变成统一的逻辑

1.鉴权的中间件

```js
const verifyPermission = async (ctx, netx) => {
  const { id } = ctx.user;
  //从params中取出我们的动态路径，对路径进行解析，传入执行数据库方法中根据传入的路径进行查询不同的表
  //需要我们在设置动态参数名时统一规范，比如:contentId ,前面是表的名称后面是Id
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");

  //数据库查询当前动态id和用户id是否匹配
  const isPermission = await permissionService.checkResoure(
    resourceId,
    resourceName,
    id
  );
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }
  await netx();
};
```

2.处理数据库的方法

```js
class PermissionService {
  async checkResoure(resourceId, resourceName, id) {
      //这里根据传来表的名称进行查询，实现通用性
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`;
    const [res] = await connection.execute(statement, [resourceId, id]);
    return !!res.length;
  }
}
```

### 12.评论接口开发

1.创建表

```js
-- 创建评论表
CREATE TABLE IF NOT EXISTS `comment`(
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(1000) NOT NULL,
	moment_id INT NOT NULL,
	user_id INT NOT NULL,
	comment_id INT DEFAULT NULL,
	createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	
	FOREIGN KEY(moment_id) REFERENCES content(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(comment_id) REFERENCES comment(id) ON DELETE CASCADE ON UPDATE CASCADE
);

```

2.创建路由

```js
const Router = require("@koa/router");
const { verifyAuth } = require("../middlewara/login.middlewara");
const { create } = require("../controller/comment.controller");
const commentRouter = new Router({ prefix: "/comment" });

commentRouter.post("/", verifyAuth, create);

module.exports = commentRouter;

```

3.创建中间件

```js
const commentService = require("../service/comment.service");

class commentCntroller {
  async create(ctx, next) {
    //1.拿到评论的信息和在谁的 评论下评论的id
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;

    //2.进行数据库插入操作
    const res = await commentService.create(content, momentId, id);
    ctx.body = {
      code: 0,
      message: "创建评论成功",
      data: {
        res,
      },
    };
  }
}

module.exports = new commentCntroller();
```

4.执行数据库操作

```js
const connection = require("./user.service");

class commentService {
  async create(content, momentId, userId) {
    const statement =
      "INSERT INTO `comment` (content, moment_id, user_id) VALUES (?, ?, ?);";

    const [res] = await connection.execute(statement, [
      content,
      momentId,
      userId,
    ]);
    return res;
  }
}

module.exports = new commentService();

```

#### 12.1. 回复评论

1.创建路由

```js
commentRouter.post("/reply", verifyAuth, reply);
```

2.创建中间件

```js
 async reply(ctx, next) {
    //1.拿到评论的信息和在谁的 评论下评论的id
    //commentID是记录在哪个评论底下回复评论的
    //momentId是当前的评论id
    const { content, momentId, commentId } = ctx.request.body;
    const { id } = ctx.user;
    //2.进行数据库插入操作
    const res = await commentService.reply(content, momentId, commentId, id);
    ctx.body = {
      code: 0,
      message: "创建评论成功",
      data: {
        res,
      },
    };
  }
```

3.操作数据库

```js
  async reply(content, momentId, commentId, userId) {
    const statement =
      "INSERT INTO `comment` (content, moment_id, comment_id,  user_id) VALUES (?, ?, ?, ?);";

    const [res] = await connection.execute(statement, [
      content,
      momentId,
      commentId,
      userId,
    ]);
    return res;
  }
```



### 	13.标签接口



待续。。。。。。(不在状态,后面在回头完善)





