//在node环境中通常使用CommonJs的方式对模块进行引入
//ESModule通常用于浏览器，如果想使用EsModule需要做一些配置，比如webpack
const fs = require("fs");

//1.同步读取，会造成阻塞，会影响后续代码执行,返回值为读取的内容
//encoding为以什么样的格式对文件进行读取
const res = fs.readFileSync("./abc.txt", { encoding: "utf-8" });
console.log(res);
console.log("后续的代码~");

//2.使用回调函数方式进行读取，不会造成阻塞
//缺点，如果在回调函数中在读取另一个文件，代码阅读性不好
fs.readFile("./abc.txt", { encoding: "utf-8" }, (err, data) => {
  console.log(data);
});

console.log("后续的代码~");

//3.使用promise的方式进行文件的读取,不会造成阻塞
fs.promises
  .readFile("./abc.txt", { encoding: "utf-8" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => [console.log(err)]);

console.log("后续的代码~");
