const express = require("express");

const app = express();
//注册路径匹配的中间件
app.use("/home", (req, res) => {
  console.log("match/home middlewara");
  res.end("home data");
});

app.listen(9000, () => {
  console.log("服务成功开启");
});
