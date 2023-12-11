const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: ["public", "content"], //默认是public 指定静态资源文件
    // host: "0.0.0.0",   // 设置主机地址
    port: 8000, //端口号
    open: true, //是否打开浏览器
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
  resolve: {
    extensions: [".js", ".jsx"],
  },
  //配置loader选项
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/, //表示babel不对node_module下的代码进行转换
        use: {
          loader: "babel-loader",
        },
      },
      { test: /\.ts$/, exclude: /node_module/, use: "babel-loader" },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
