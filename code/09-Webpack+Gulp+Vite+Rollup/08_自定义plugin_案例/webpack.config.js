const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const AutoUpdataPlugin = require("./src/plugin/autoUpdataPlugin");
module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new AutoUpdataPlugin(),
  ],
};
