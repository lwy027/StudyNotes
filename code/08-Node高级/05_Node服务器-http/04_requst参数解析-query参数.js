const http = require("http");
const url = require("url");
const qs = require("querystring");
const server = http.createServer((req, rep) => {
  //1.参数一query类型参数
  ///list?offset=2&size=100
  //使用url进行解析
  const urlString = req.url;
  //通过url模块可以拿到url信息，包括，pathName,query
  const urlInfo = url.parse(urlString);
  console.log(urlInfo.pathname, urlInfo.query);

  //2.使用queryString模块对query参数进行解析
  //返回query对象类型
  const query = qs.parse(urlInfo.query);
  //通过属性访问参数
  console.log(query.offset, query.size);
  rep.end("返回商品列表");
});

server.listen(8000, () => {
  console.log("服务器开启成功~~~");
});
