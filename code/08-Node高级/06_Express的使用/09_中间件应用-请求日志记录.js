const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const app = express();

const weiteStream = fs.createWriteStream("./log/access.log", {
  flags: "a+",
});
//创建请求日志,以插件的形式使用
//combined把日志联合放在一个文件中,stream写入流
app.use(morgan("combined", { stream: weiteStream }));
app.post("/login", (req, res) => {
  res.end("登录成功");
});

app.listen(8000, () => {
  console.log("服务创建成功");
});
