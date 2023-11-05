const http = require("http");

const server = http.createServer((req, rep) => {
  console.log("客户端访问成功~");
  const url = req.url;
  const method = req.method;

  if (url === "/login") {
    if (method == "POST") {
      rep.end("登录成功");
    } else {
      rep.end("请确定您的请求方法是否正确");
    }
  } else if (url == "/products") {
    rep.end("返回商品列表");
  } else if (url == "/lyric") {
    rep.end("天空好像下雨, 我好像住你隔壁");
  }
});

server.listen(8000, () => {
  console.log("服务器开启成功");
});
