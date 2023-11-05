const fs = require("fs");

const content = "hello World My name is lwy";

//flag是对文件的一些写入规定
fs.writeFile("ccc.txt", content, { encoding: "utf-8", flag: "w" }, (err) => {
  console.log(err);
});
