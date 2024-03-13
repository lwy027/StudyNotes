const dotenv = require("dotenv");

//单环境配置
// dotenv.config({
//   path: "./.env",
// });

//多环境配置,
//$ export NODE_ENVIRONMENT='development' 通过设置NODE_ENVIRONMENT指定当前的开发环境读取不同的路径
dotenv.config({
  path:
    process.env.NODE_ENVIRONMENT === "production" ? ".production.env" : ".env",
});

console.log(process.env.aaa);
console.log(process.env.bbb);
