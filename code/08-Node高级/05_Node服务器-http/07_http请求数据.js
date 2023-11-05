const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json;charset=utf8");
  const list = [
    {
      name: "lwy",
      age: 20,
    },
    {
      name: "koni",
      age: 22,
    },
  ];
  //响应类型为JSON类型
  res.end(JSON.stringify(list));
});

server.listen(8000, () => {
  console.log("开启服务器成功");
});
