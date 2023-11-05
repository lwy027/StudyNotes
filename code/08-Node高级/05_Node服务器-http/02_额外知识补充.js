const http = require("http");

//1.创建server服务器
const server = http.createServer((req, rep) => {
  console.log("服务器被访问");
  //1.获取请求url
  console.log(req.url);
  //2.获取请求头
  console.log(req.headers);
  //3.获取请求方法
  console.log(req.method);
  rep.end("你好啊，李银河");
});
//开启web服务器
server.listen(8000, () => {
  console.log("服务器开启成功");
});
