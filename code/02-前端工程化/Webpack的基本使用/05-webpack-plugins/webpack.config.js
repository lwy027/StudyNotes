const path = require("path")

const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'build'),
    clean: true
  },
  resolve: {
    extensions: [".js", '.json', '.vue', ".ts", ".jsx"],
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
  plugins: [

    new HtmlWebpackPlugin({
      title: "webpack练习",
      template: './index.html'
    }),
  ],


}