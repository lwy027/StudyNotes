function helpOptions(program) {
  //1.处理version操作
  //从package.json中拿到版本号
  const version = require("../../package.json").version;
  //处理--version -v操作 ,读取版本并返回，并且可以设置支持的命令
  program.version(version, "-v --version");

  //2.增强其他的options的操作
  //第一个参数是命令，第二个是描述
  program.option("-l --lwy", "a lwy's cli");
  program.option(
    "-d --dest <dest>",
    "a destination folder, 例如: -d src/components"
  );
  //添加--help属性,默认就有的命令
  program.on("--help", () => {
    console.log("");
    console.log("others:");
    console.log("  xx");
    console.log("  yy");
  });
}

module.exports = helpOptions;
