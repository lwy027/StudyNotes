const { src, dest, watch, parallel, series } = require("gulp");
const htmlmin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const less = require("gulp-less");
const inject = require("gulp-inject");

const browser = require("browser-sync");

//1.对html进行打包,使用 gulp-htmlmin
const htmlTask = () => {
  return src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true })) //去除空格
    .pipe(dest("./build"));
};

//2.对js进行打包,使用 pnpm add @babel/core gulp-babel @babel/preset-env -D对js代码进行转换
const jsTask = () => {
  return src("./src/**/*.js")
    .pipe(babel({ presets: ["@babel/preset-env"] })) //babel代码转换
    .pipe(terser({ mangle: { toplevel: true } })) //terser丑化代码
    .pipe(dest("./build"));
};

//3.处理less文件
const lessTask = () => {
  return src("./src/**/*.less").pipe(less()).pipe(dest("./build"));
};

//4.把css,js文件注入html文件中
const injectTask = () => {
  return src("./build/*.html")
    .pipe(
      inject(src(["./build/**/*.js", "./build/**/*.css"]), {
        relative: true, //显示的路径为相对路径
      })
    )
    .pipe(dest("./build"));
};

//开启本地服务器 browser-sync
const bs = browser.create();
const serve = () => {
  //在打开浏览器时才做监听文件变化操作
  watch("./src/**", buildTask);
  bs.init({
    port: 8080,
    open: true,
    files: "./build/*",
    server: {
      baseDir: "./build",
    },
  });
};

//可以看出gulp就是通过执行一个个任务利用第三方插件的方式对项目进行了打包

//这样写injectTask任务不生效
// const buildTask = series(parallel(htmlTask, jsTask, lessTask), injectTask);
const buildTask = series(parallel(htmlTask, jsTask, lessTask));
const serveTask = series(buildTask, serve);

//但是单独执行injectTask时会生效
//记得在index.html文件中加注释,只有加了这样的注释，inject才会在对应得到位置添加文件
//<!-- inject:css --> <!-- inject:js -->
//<!-- endinject --> <!-- endinject -->

module.exports = {
  buildTask,
  injectTask,
  serveTask,
};
