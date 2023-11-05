const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ["js", 'json', 'vue', "ts", "jsx"],
    alias: {
      "@": path.resolve(__dirname, './src'),

    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader", "style-loader", {
          loader: "posscss-loader"
        }]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader", "css-loader", "less-loader"
        ]
      },
      {
        test: /\.(png svg|jpg|jpeg gif)s/i,
        type: "asset",
        generator: {
          filename: "img/[name].[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        }
      },
      {
        test: /\.js$/,
        use: ["babel-loader"]
      }
    ]
  },
  // Plugins: [
  //   new CleanWebpackPlugin(),
  //   new HtmlWebpackPlugin({
  //     title: "webpack案例"
  //   })



}