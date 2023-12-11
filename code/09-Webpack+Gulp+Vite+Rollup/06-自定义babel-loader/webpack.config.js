const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle.js",
  },
  resolveLoader: {
    modules: ["node_modules", "./wy_loader"], //配置解析loder的地址文件，默认会从node_module
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/, //指向顺序:从后向前、从右向左的
      //   // use: "./wy_loader/01_wy_loader01.js", //完整路径写法
      //   use: ["01_wy_loader01", "02_wy_loader02.js", "03_wy_loader03.js"], //因为上面配置了读取loader地址，所有这里只写文件名就可以
      // },
      // {
      //   test: /\.js$/,
      //   use: "01_wy_loader01",
      // },
      // {
      //   test: /\.js$/,
      //   use: "02_wy_loader02",
      //   enforce: "post",
      // },
      // {
      //   test: /\.js$/,
      //   use: "03_wy_loader03",
      //   enforce: "pre",
      // },

      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  },
};
