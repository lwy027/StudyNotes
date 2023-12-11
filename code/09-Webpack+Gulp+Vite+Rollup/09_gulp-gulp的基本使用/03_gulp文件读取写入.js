const { src, dest, watch } = require("gulp");

const copyFile = () => {
  //把目标文件copy到目标地址
  return src("./src/main.js").pipe(dest("./build"));
};

//监听指定文件的变化，并且当文件发生变化时，重新执行copyFile函数
watch("./src/**/*.js", copyFile);
module.exports = {
  copyFile,
};
