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
