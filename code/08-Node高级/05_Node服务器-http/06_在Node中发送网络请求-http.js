const http = require("http");
//get默认帮我们调用end说明写入内容完成
http.get("http://localhost:8000", (res) => {
  //从可读流中获取数据
  res.on("data", (data) => {
    //因为拿到的JSON类型，我们需要转换
    const Info = JSON.parse(data);
    console.log(Info);
  });
});
//http默认值提供的get方法进行请求，如果要使用其他方法需要使用request方法
//使用request方法需要手动调用end方法
const req = http.request(
  {
    method: "POST",
    hostname: "localhost",
    port: 8000,
  },
  (res) => {
    res.on("data", (data) => {
      const Info = JSON.parse(data);
      console.log(Info);
    });
  }
);
//手动调用end方法
req.end();
