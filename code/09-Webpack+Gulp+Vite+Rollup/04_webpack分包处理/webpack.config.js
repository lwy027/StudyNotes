const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "production",
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
    path: path.resolve(__dirname, "./build"),
    filename: "js/[name]-bundle.js", //[name]是占位作用 多入口文件的名字
    //单独针对分包的文件进行命名
    chunkFilename: "js/[name]_chunk.js",
    clean: true,
    // publicPath: "http://liweiyeCdn/",
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
          //"style-loader",     //style-loader 以内联样式的方式添加css
          MiniCssExtractPlugin.loader, //miniCss以link标签的方式引入css
          "css-loader", //webpack中loader生效是以下往上的  css负责处理css文件 style-loader负责展示样式
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css",
    }),
  ],
  optimization: {
    chunkIds: "deterministic",
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      chunks: "all",
      //拆分包的最小体积
      //如果一个包拆分出来达不到minSize,·那么这个包就不会拆分（会被合并到其他包中）
      minSize: 2000,
      //将大于maxSize的包，拆分成不小于minSize的包()
      maxSize: 10000,
      //对于拆分包进行分组
      cacheGroups: {
        //key 名称 test匹配规则 filename生成文件名
        venders: {
          test: /node_module/,
          filename: "js/[id]_vendors.js",
        },
        router: {
          test: /router/,
          filename: "js/[id]_router.js",
        },
      },
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      // new TerserPlugin({
      //   extractComments: false,
      //   terseroptions: {
      //     compress: {
      //       unused: false,
      //     },
      //     mangle: true,
      //     toplevel: true,
      //     keep_classnames: true,
      //     keep_fnames: true,
      //   },
      // }),
      // new CssMinimizerPlugin({
      //   parallel: true,
      // }),
    ],
  },
};
