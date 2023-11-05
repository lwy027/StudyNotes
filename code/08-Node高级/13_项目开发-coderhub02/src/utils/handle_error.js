const app = require("../app/app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXITS,
  NAME_IS_NOT_EXITS,
  PASSWORD_IS_NOT_INCORRECT,
  USER_IS_NOT_ANTHORIZATION,
  OPERATION_IS_NOT_ALLOWED,
} = require("../config/error");

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
    case NAME_IS_NOT_EXITS:
      code = -1003;
      message = "用户不存在，请重新输入";
      break;
    case PASSWORD_IS_NOT_INCORRECT:
      code = -1004;
      message = "密码错误，请重新输入";
      break;
    case USER_IS_NOT_ANTHORIZATION:
      code = -1005;
      message = "无效的token或者已经过期";
      break;
    case OPERATION_IS_NOT_ALLOWED:
      code = -1006;
      message = "当前的操作不在您的权限之内";
      break;
  }

  ctx.body = {
    code,
    message,
  };
});
