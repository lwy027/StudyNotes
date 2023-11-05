const fs = require("fs");

//1.一次写入全部内容
fs.writeFile(
  "./bbb.txt",
  "hello world",
  {
    flag: "a+",
  },
  () => {
    console.log("写入成功");
  }
);

//2.创建一个写入流
const writeStream = fs.createWriteStream("ccc.txt", {
  flags: "a+",
  start: 5,
});

writeStream.write("lwy");

writeStream.on("open", (fd) => {
  console.log("文件被打开了", fd);
});

//finish表示写入完成了，和read中的end一个意思
writeStream.on("finish", () => {
  console.log("写入完成");
});

//如果不手动关闭，这里不会执行
writeStream.on("close", () => {
  console.log("文件已关闭");
});

//end方法，会将内容写入到文件，并且帮我们关闭文件
writeStream.end("哈哈哈哈");

//writeStream流不会默认关闭，需要手动控制
// writeStream.close();
