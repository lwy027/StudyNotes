const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const compressionPlugin = require("compression-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  mode: "production",
  devtool: false,
  //排除某些包不需要进行打包
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
    new CompressionPlugin({
      test: /\.(css|js)$/, //匹配哪些文件需要压缩
      algorithm: "gzip", //采用的压缩算法
      minRatio: 0.7, //至少的压缩比例
      threshold: 500, //设置文件从多大开始压缩
      // include,
      // exclude,
    }),
  ],
};
