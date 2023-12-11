const gulp = require("gulp");

const foo = (cb) => {
  console.log("foo任务被执行了~");

  //把任务关闭
  cb();
};

gulp.task("bar", (cb) => {
  console.log("bar任务被执行");
  cb();
});

//导出任务foo gulp帮我们执行
module.exports = {
  foo,
};

//默认任务
module.exports.default = (cb) => {
  console.log("default task exec");
  cb();
};
