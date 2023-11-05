const express = require("express");
const axios = require("axios");

const app = express();

//在express中
//异步代码执行时，中间件不会在按照洋葱模型
//next()返回值为void，在进行异步请求时，拿不到异步代码的结果
//awit会等带后面promise的结果在执行后面的代码
//但是next()的返回值为void,所以awit是没有意义的
//所以express在执行异步代码时，不会按照洋葱模型
app.get("/", async (req, res, next) => {
  console.log("express middlewara 01");
  req.msg = "aaa";
  await next();
  //异步执行时，在express中并不会等带异步执行完毕拿到结果在返回
  //这是因为在express中next()返回的时void,所以拿不到值
  res.json(req.msg); //"aaabbb"
});
app.get("/", async (req, res, next) => {
  console.log("express middlewara 02");
  req.msg += "bbb";
  await next();
});
app.get("/", async (req, res, next) => {
  //进行网络请求模拟异步代码
  const resData = await axios.get("http://123.207.32.32:8000/home/mu1tidata");
  req.msg += resData.data.data.banner.list[0].title;
  console.log("express middlewara 03");
});

app.listen(9000, () => {
  console.log("服务开启");
});
