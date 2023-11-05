//导入模块
const express = require("express");

//使用模块,express本质是个函数，内部帮我们调用了http.createServer()并返回一个http
const app = express();
//相比以前的逻辑处理都在createServer()中，并且要单独对不同的url请求方法进行判断
//使用框架变得更加间接，逻辑清晰了

//login的post请求
app.post("/login", (req, res) => {
  res.end("登录成功,欢迎回来");
});
//home的get请求
app.get("/home", (req, res) => {
  res.end("商品列表,轮播图列表");
});

app.listen(9000, () => {
  console.log("服务开启成功");
});
