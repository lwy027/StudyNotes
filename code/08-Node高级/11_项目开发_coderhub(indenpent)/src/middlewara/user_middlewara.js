const userService = require("../app/dtabase");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXITS,
} = require("../config/error");
const md5password = require("../utils/md5_password");

const verfyUser = async (ctx, next) => {
  const user = ctx.request.body;
  const { name, password } = user;

  //对信息进行判断
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  //对数据库进行查询操作，如果name重新也不添加
  const users = await userService.findUserByName(name);
  if (users.length) {
    return ctx.app.emit("error", NAME_IS_ALREADY_EXITS, ctx);
  }

  await next();
};

//进行密码加密

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = { verfyUser, handlePassword };
