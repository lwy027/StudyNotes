const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
const babel = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");
const postcss = require("rollup-plugin-postcss");
const isproduction = process.env.NODE_ENV;

const pluginsCongig = [
  commonjs(),
  nodeResolve(),
  babel({
    exclude: "node_modules/**", //排除
    babelHelpers: "bundled", //polyfill,如果添加会使用默认值
  }),
  terser(),
  postcss(),
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
  vue(),
];

if (!isproduction) {
  pluginsCongig.push(
    serve({
      //open:true,
      p0rt: 8888,
      contentBase: ".",
    })
  );
}

module.exports = {
  input: "./src/main.js",
  //写成数组我们可以对文件进行分别打包，打包出更多的库文件（用户可以根据不同的需求来引入）：
  output: [
    {
      format: "umd",
      name: "lwyUtils",
      file: "./build/bundle.umd.js",
      globals: {
        lodash: "_",
      },
    },
    {
      format: "amd",
      file: "./build/bundle.amd.js",
      globals: {
        lodash: "_",
      },
    },
    {
      format: "umd",
      file: "./build/bundle.cjs.js",
      globals: {
        lodash: "_",
      },
    },
    {
      format: "iife",
      file: "./build/bundle.iife.js",
      globals: {
        lodash: "_",
      },
    },
  ],
  external: ["lodash"],

  plugins: pluginsCongig,
};
