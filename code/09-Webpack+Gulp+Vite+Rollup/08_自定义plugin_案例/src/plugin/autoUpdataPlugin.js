class AutoUpdataPlugin {
  apply(compiler) {
    console.log("AutoUpdataPlugin被注册", compiler);
  }
}

//默认导出
module.exports = AutoUpdataPlugin;
//分别导出
module.exports.AutoUpdataPlugin = AutoUpdataPlugin;
