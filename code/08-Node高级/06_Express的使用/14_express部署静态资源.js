const express = require("express");

const app = express();
//静态服务器部署成功，我们这里可以是一个开发好的网站
//这样直接就可以在本地访问到网站啦
app.use(express.static("./dist"));

app.listen(9000, () => {
  console.log("静态服务器启动成功");
});
``;
