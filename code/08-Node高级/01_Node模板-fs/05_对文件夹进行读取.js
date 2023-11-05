const fs = require("fs");

//默认返回的是数组的字符串形式
//使用withFileTypes 可以展示文件的类型，里面是对象，可以使用更多方法对文件进行操作
fs.readdir("./lwy", { withFileTypes: true }, (err, files) => {
  files.forEach((item) => {
    if (item.isDirectory) {
      console.log("我是文件夹" + item.name);
    } else {
      console.log("我是文件" + item.name);
    }
  });
});

//还可以写一个递归函数，对多层嵌套的文件进行操作

function readFileFn(path) {
  fs.readdir(path, { withFileTypes: true }, (err, files) => {
    files.forEach((item) => {
      if (item.isDirectory()) {
        readFileFn(`${path}/${item.name}`);
      } else {
        console.log("我是文件" + item.name);
      }
    });
  });
}

readFileFn("./lwy");
