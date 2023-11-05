const useService = require("../app/database");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXITS,
} = require("../config/error");
const md5password = require("../utils/md5_password");

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

const handlePassword = async (ctx, next) => {
  //1. 取出密码
  const { password } = ctx.request.body;

  //2. 对密码进行加密
  ctx.request.body.password = md5password(password);

  await next();
};

module.exports = { verifyUser, handlePassword };
