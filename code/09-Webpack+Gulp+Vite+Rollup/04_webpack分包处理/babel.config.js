module.exports = {
  //使用预设
  presets: [
    [
      "@babel/preset-env",
      // {
      //   //设置polyfill
      //   corejs: 3,
      //   useBuiltIns: "entry",
      // },
    ],
    "@babel/preset-react",
    [
      "@babel/preset-typescript",
      {
        corejs: 3,
        useBuiltIns: "usage",
      },
    ],
  ],
};
