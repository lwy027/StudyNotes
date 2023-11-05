const fs = require("fs");

fs.open("b.txt", (err, fd) => {
  if (err) {
    console.log("文件打开发生错误", err);
  }
  //fd是文件属性描述符的数字标识符
  console.log(fd);

  //这里可以通过文件的属性描述符，再次对文件进行读取等操作
  //其实底层就是通过属性描述符对文件进行了读取，只不过node进行了一层封装
  fs.readFile(fd, { encoding: "utf-8" }, (err, data) => {
    console.log(data);
  });

  //可以通过fstat获取文件的状态
  fs.fstat(fd, (err, state) => {
    console.log(state);
  });
  //最后可以把文件关闭
  fs.close();
});
