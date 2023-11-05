const express = require("express");

const app = express();

//同步代码执行时，中间件按照洋葱模型
//从外向内执行，执行完成后在从内向外执行
//相当于先执行next()执行下一个中间件的代码，最后才会返回最外层的res.json()
app.get("/", (req, res, next) => {
  console.log("express middlewara 01");
  req.msg = "aaa";
  next();
  res.json(req.msg); //"aaabbbccc"
});
app.get("/", (req, res, next) => {
  console.log("express middlewara 02");
  req.msg += "bbb";
  next();
});
app.get("/", (req, res, next) => {
  req.msg += "ccc";

  console.log("express middlewara 03");
});

app.listen(9000, () => {
  console.log("服务开启");
});
