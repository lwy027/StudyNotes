const app = require("../app/app");
const {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXITS,
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
  }

  ctx.body = {
    code,
    message,
  };
});
