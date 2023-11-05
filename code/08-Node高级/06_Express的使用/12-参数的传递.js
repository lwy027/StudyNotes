const express = require("express");

const app = express();

//客户端以query方式进行数据请求
//http://localhost:8000/login?name=lwy&age=20
app.get("/login", (req, res) => {
  //express内部已经帮我们解析好了query，可以直接在req上拿
  console.log(req.query);
  res.end("请求成功");
});
//客户端以params方式进行数据请求
//http://localhost:8000/login/333
app.get("/login/:id", (req, res) => {
  //express内部已经帮我们解析好了params，可以直接在req上拿
  const id = req.params.id;
  res.end("请求成功" + id);
});

app.listen(8000, () => {
  console.log("开启服务成功");
});
