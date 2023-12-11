const glob = require("glob");
const webpack = require("webpack");
const path = require("path");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

module.exports = {
  mode: "development",

  devServer: {
    static: ["public", "content"], //默认是public 指定静态资源文件
    // host: "0.0.0.0",   // 设置主机地址
    port: 8000, //端口号
    // open: true, //是否打开浏览器
    compress: true, //是否对文件进行压缩
    proxy: {
      "/api": {
        target: "http://localhost:9000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
  plugins: [
    new PurgeCSSPlugin({
      //立即获取所有的路径传递给paths传递的是一个数组    /**/* 表示的是递归的找src下的所有文件
      paths: glob.sync(`${path.resolve(__dirname, "../src")}/**/*`, {
        nodir: true, //nodir表示要找的不是文件夹
      }),
      safelist: {
        standard: ["html"],
      },
    }),
    //作用域提升
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
};
