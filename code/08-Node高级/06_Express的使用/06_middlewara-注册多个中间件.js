const express = require("express");

const app = express();

//在回调函数后可以有多个回调，也就是在中间件
//在实际开发中我们使用next()在不同的中间件中完成不同的操作
//比如判断用户是否存在 ——> 查询数据 ——>返回数据
//可以在每一层进行不同的逻辑，如果有一层不符合那么就不next()
app.get(
  "/home",
  (req, res, next) => {
    console.log("many middlemara 01");
    next();
  },
  (req, res, next) => {
    console.log("many middlemara 02");
    next();
  },
  (req, res, next) => {
    console.log("many middlemara 03");
    next();
  },
  (req, res) => {
    console.log("many middlemara 04");
  }
);

app.listen(8000, () => {
  console.log("服务已开启");
});
