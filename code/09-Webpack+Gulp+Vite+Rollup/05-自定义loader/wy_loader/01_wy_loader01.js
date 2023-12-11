module.exports = function (content, map, meta) {
  console.log("wy_loader01:", content, map, meta);
  const callback = this.async();

  //第一个参数是是处理错误信息,第二个参数是返回结果

  //使用async函数，就会把当前loader变成异步的，下一个执行的loader会等待这个loader有结果之后执行
  //如果是一个同步的loader会报错
  setTimeout(() => {
    callback(null, content + "aaa");
  }, 2000);
};

module.exports.pitch = function () {
  console.log("loader01 pitch");
};
