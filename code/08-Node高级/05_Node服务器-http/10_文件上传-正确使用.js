const http = require("http");
const fs = require("fs");
const qs = require("querystring");

const server = http.createServer((req, res) => {
  //图片文件必须设置为二进制
  req.setEncoding("binary");
  //内容类型
  const contentType = req.headers["content-type"];
  console.log(contentType);
  //获取content-type中的boundary的值
  const boundary = contentType.split("; ")[1].replace("boundary=", "");
  //文件数据，因为文件太大可能不会一下子上传完，所以进行拼接
  let body = "";
  req.on("data", (data) => {
    console.log(data);
    body += data;
  });

  req.on("end", () => {
    console.log(body);
    // 1.对数据进行切割
    const payload = qs.parse(body, "\r\n", ":");
    //获取最后的类型(image/png)
    const fileType = payload["Content-Type"].substring(1);
    //获取要截取的长度
    const fileTypePosition = body.indexOf(fileType) + fileType.length;
    let imageData = body.substring(fileTypePosition);
    imageData = imageData.replace(/^\s\s*/, "");
    imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`));
    //img数据处理完毕，对文件进行写入
    fs.writeFile("./foo.png", imageData, "binary", (err) => {
      res.end("文件上传成功~");
    });
  });
});

server.listen(8000, () => {
  console.log("服务器启动成功");
});
