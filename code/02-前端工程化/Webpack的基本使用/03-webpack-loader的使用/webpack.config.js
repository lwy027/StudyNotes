const path = require("path")

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  //对模块进行配置
  module: {
    //配置的规则，是一个数组结构
    rules: [
      //里面时一个个对象，表示有不同的规则
      {
        //对应匹配规则
        test: /\.css$/,
        //使用的loader数组形式，里面是对象
        // use: [
        //   { loader: 'style-loader' },
        //   { loader: 'css-loader' },
        //   {}
        // ],
        //简写一：如果loader只有一个
        // loader: "css-style"
        //简写二：多个loader不需要其他属性时，可以直接写loader字符串形式
        use: ["css-loader", "style-loader", {
          loader: "postcss-loader",

        }]




      },
      {
        //less-loader的配置
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  }
}