//使用http模块
const http = require("http");

//创建一个http对应的服务器
//request和respone都是基于流实现的
//所有的流都是EventEmitter的实例。
//request 可读流
//respone: 写入流
const server = http.createServer((request, response) => {
  //~request对象中包含本次客户端请求的所有信息
  //清求的url
  //请求method
  //请求headers
  //清求携带的数据
  //:response对象用于给客户端返回结果的
  //可以使用写入流的end方法,写入数据，并且关闭写入
  response.end("hello World");
});

//开启对应的服务器，并且告知需要监听的端口
//当客服端请求这个端口时，我们就可以通过这个端口返回给客户端数据
//监听端口时，监听1024以上的端口，666535以下的端口
//1025 ~ 65535之间的端口
//2个字节 => 256*256 =>65536=>0 ~ 65535
server.listen(8000, () => {
  console.log("服务器已经开启成功...");
});
