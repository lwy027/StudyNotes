const fs = require("fs");

//指定8个字节大小
const buffer = Buffer.alloc(8);

//<Buffer 00 00 00 00 00 00 00 00> 默认都是0
console.log(buffer);

//因为buffer是以数组方式储存，所以可以使用数组方式进行操作
buffer[0] = "w".charCodeAt(); //指定字符转换
buffer[1] = 0x66;
buffer[2] = 200;
console.log(buffer); //<Buffer 64 66 c8 00 00 00 00 00>

console.log(buffer.toString());
