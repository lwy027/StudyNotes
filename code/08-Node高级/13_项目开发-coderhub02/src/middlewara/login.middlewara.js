const jwt = require("jsonwebtoken");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXITS,
  PASSWORD_IS_NOT_INCORRECT,
  USER_IS_NOT_ANTHORIZATION,
} = require("../config/error");
const useServeice = require("../app/database");
const md5password = require("../utils/md5_password");
const { PUBLIC_KEY } = require("../config/secretKey");
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

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit("error", USER_IS_NOT_ANTHORIZATION, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  try {
    const res = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    console.log(res);
    ctx.user = res;
    await next();
  } catch (error) {
    console.log(error);
    ctx.app.emit("error", USER_IS_NOT_ANTHORIZATION, ctx);
  }
};

module.exports = { verifyLogin, verifyAuth };
