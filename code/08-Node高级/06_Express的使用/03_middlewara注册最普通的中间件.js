const express = require("express");

const app = express();
//总结：当express接收到客户端发送的网络请求时·在所有中间间开始进行匹配
//当匹配到第一个符合要求的中间件时，·那么就会执行这个中间件
//通过use方法注册的中间件是最普通的/简单的中间件
//通过use注册的中间件，无论是什么请求方式都可以匹配上
// Login/get
// Login/post
// abc/patch

//use相当与使用http.createServer()这种形式的使用，只要客户端接入就会执行
//而app.post("url")这种相当于进行了url加方法逻辑判断，只有符合的请求才会执行
app.use((req, res, next) => {
  console.log("narmal middlewara 01");
  res.end("返回结果了,不要等了");
  //有了next会找到匹配的中间件
  next();
});

app.use(() => {
  console.log("narmal middlewara 02");
});

app.listen(9000, () => {
  console.log("开启监听服务");
});
