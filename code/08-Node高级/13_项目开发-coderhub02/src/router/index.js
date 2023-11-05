const fs = require("fs");

function register(app) {
  //1.拿到当前目录下的文件
  const files = fs.readdirSync(__dirname);

  //2.对当前目录下文件进行遍历，进行动态路由注册
  for (let file of files) {
    if (!file.endsWith(".router.js")) continue;
    const router = require(`./${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}

module.exports = register;
