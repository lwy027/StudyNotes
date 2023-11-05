const fs = require("fs");

//1.普通方式读取直接一次性读取完
//缺点一：无法精准控制从哪里读取，读取到什么位置
//缺点二：读取到某一个位置时，暂停读取，恢复读取
//缺点三：文件非常大的时候，多次读取
fs.readFile("./abc.txt", (err, data) => {
  console.log(data);
});

//2.创建一个可读流
//start:从什么位置开始读(字节的位置) 因为文件内容经过二进制转换会放在一个buffer数组中，所以开始下标为0
//end:结束位置
//highWaterMark:可以决定一次读多少个字节

//这里会返回一个ReadStream
const readStream = fs.createReadStream("./abc.txt", {
  start: 0,
  end: 10,
  highWaterMark: 3,
});
//因为所有的流都是events的实例，所有我们接收数据使用事件监听的方式，结果放在了data中事件中，node内部帮我们封装好了
//内部已经帮我们发出事件
readStream.on("data", (data) => {
  console.log(data.toString());
  readStream.pause(); //使用readStream中提供的方法可以实现暂停读取

  setTimeout(() => {
    readStream.resume(); //还可以恢复读取，这样就实现了每1秒读取一次的效果
  }, 1000);
});

//3.其他事件监听补充
readStream.on("open", (fd) => {
  console.log("文件被打开", fd);
});
readStream.on("end", () => {
  console.log("文件读取完毕");
});
//不需要手动关闭文件，当我们读取文件完毕，会自动帮我们关闭
readStream.on("close", () => {
  console.log("读取完毕，关闭文件");
});
