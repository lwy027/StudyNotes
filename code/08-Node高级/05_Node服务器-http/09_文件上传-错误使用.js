const { WriteStream } = require("fs");
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const write = fs.createWriteStream("./bar.png");
  //拿到文件的字节
  req.on("data", (data) => {
    //把文件写入到本地文件
    //这种使用方法会把所有的data数据都写入，客户端请求的数据可能不只是图片的信息，所有图片可能不会正常的展示
    // write.write(data);
    //因为req是可读流,所有可以使用pipe直接copy
    req.pipe(write);
  });

  req.on("end", () => {
    console.log("数据传输完成");
    write.close();
    res.end("文件上传成功");
  });
});

server.listen(8000, () => {
  console.log("开启服务成功");
});
