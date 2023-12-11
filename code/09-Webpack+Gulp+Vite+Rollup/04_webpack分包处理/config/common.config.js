const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const devConfig = require("./dev.config");
const prodConfig = require("./prod.config");
const path = require("path");
const commonConfig = function (isproduction) {
  return {
    entry: {
      index: {
        import: "./src/index.js",
        // dependOn: "shared",
      },
      main: {
        //对象写法
        import: "./src/main.js", //指定路径
        // dependOn: "shared", //共享依赖
      },
      // shared: ["axios"], //指定共享第三方库
    },
    // devtool: "source-map",
    output: {
      path: path.resolve("./build"),
      filename: "js/[name]-bundle.js", //[name]是占位作用 多入口文件的名字
      //单独针对分包的文件进行命名
      chunkFilename: "js/[name]_chunk.js",
      clean: true,
      // publicPath: "http://liweiyeCdn/",
    },
    //排除某些包不需要进行打包
    externals: {
      //key属性名：排除的框架的名称
      //value值：从CDN地址请求下来的js中提供对应的名称
      axios: "axios",
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
        {
          test: /\.css$/,
          use: [
            isproduction ? "style-loader" : MiniCssExtractPlugin.loader, //对mode进行判断使用不同的加载器
            "css-loader", //webpack中loader生效是以下往上的  css负责处理css文件 style-loader负责展示样式
          ],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        minify: isproduction
          ? {
              removeComments: true, //~除注释
              collapseWhitespace: false, //折叠空格
              removeRedundantAttributes: false, //移除多余的属性type=text
              useShortDoctype: true, //比如我们的模板是html4,那么会转htm5的文档
              removeEmptyAttributes: true, //移除空的属性id""
              removeStyleLinkTypeAttributes: true, //比如nink中的type="text/css"
              keepClosingSlash: true, //是否保持单元素的尾部
              minifycsS: false, //是否压缩css
              minifyJs: {
                mangle: {
                  toplevel: true,
                },
              },
            }
          : false,
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "css/[name].css",
      }),
    ],
  };
};

//共同配置导出一个函数，在函数可以拿到package文件配置中 --env的参数
module.exports = function (env) {
  console.log(env);
  const { production } = env;
  let mergeConfig = production ? prodConfig : devConfig;
  return merge(commonConfig(production), mergeConfig); //使用webpack-merge对公共配置和不同的开发环境配置进行合并
};
