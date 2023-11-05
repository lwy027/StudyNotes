const fs = require("fs");

//现在不推荐这种写法
const buffer = new Buffer("hello");
//默认会把字符转换成16进制放在一个buffer数组中
//<Buffer 68 65 6c 6c 6f>
console.log(buffer);

//现在的写法，通过类中的一个方法把字符转换成字节
//一般一个英文1个字节，一个中文3个字节
const buffer02 = Buffer.from("你好啊");

console.log(buffer02);
console.log(buffer02.toString()); //可以使用toString把字节转换成字节

//如果写入和转换的编码格式不一致，会造成乱码问题
const buffer03 = Buffer.from("lwy", "utf-8");
console.log(buffer03.toString("utf16le"));
