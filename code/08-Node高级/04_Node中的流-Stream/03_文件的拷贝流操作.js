const fs = require("fs");

//方式一:一次性读取和吸入文件
fs.readFile("./foo.txt", (err, data) => {
  console.log("文件读取成功");
  console.log(data);

  fs.writeFile("./foo_copy01.txt", data, (err) => {
    console.log("文件写入成功");
  });
});

//方式二：使用读取流和写入流
const readStream = fs.createReadStream("./foo.txt");
const writeStream = fs.createWriteStream("./foo_copy02.txt");

readStream.on("data", (data) => {
  writeStream.write(data);
});
readStream.on("end", () => {
  //在文件读取完毕后把写入流关闭
  writeStream.close();
});

//方式三：使用pipe,相当于在读和写之间建立一个管道，直接把读到的数据，写入

const readStream01 = fs.createReadStream("./foo.txt");
const writeStream02 = fs.createWriteStream("./foo_copy03.txt");

readStream01.pipe(writeStream02);
