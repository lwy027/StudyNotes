//node服务器代理
//webpack =webpack-dev-server
const express = require("express");
//在webpack中开启代理服务器，也是使用了这个中间件
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

//虽然我们使用了代理服务器，但是在请求我们的代理服务器时，仍然存在跨域问题
//这里仍需要把静态资源和服务器部署在一个服务器上，或者使用CORS解决代理服务器跨域的问题
app.use(express.static("./client")); //在webpack中开启代理服务器它默认已经把我们的静态资源和服务器部署在一个服务器中了
//api是请求代理服务器路径
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8000", //target：进行转发请求代理的目标服务器
    pathRewrite: {
      "^/api": "", //因为我们转发开始的路径中带有api,所以这里需要对路径进行重写，把api代替
    },
  })
);

app.listen(9000, () => {
  console.log("proxy代理服务器开启成功");
});
