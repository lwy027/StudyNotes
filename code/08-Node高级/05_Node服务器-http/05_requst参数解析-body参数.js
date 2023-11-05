const http = require("http");

const { parse } = require("path");
const server = http.createServer((req, rep) => {
  //拿到body参数信息，进行判断登录逻辑
  //因为req就是读入流，所有可以在data中拿到body数据
  console.log(req.headers);
  req.setEncoding("utf-8"); //设置编码格式
  req.on("data", (data) => {
    //对数据进行解析
    //解析JSOn数据
    const userInfo = JSON.parse(data);
    //拿到数据进行操作
    const name = userInfo.name;
    const password = userInfo.password;
    let isLogin = false;
    if (name === "liweiye" && password == "123456") {
      isLogin = true;
    } else {
      isLogin = false;
    }
    req.on("end", () => {
      if (isLogin) {
        rep.end("登录成功，欢迎回来");
      } else {
        rep.end("请检查您的用户名与密码");
      }
    });
  });
});

server.listen(8000, () => {
  console.log("服务器开启成功~~~");
});
