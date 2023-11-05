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
