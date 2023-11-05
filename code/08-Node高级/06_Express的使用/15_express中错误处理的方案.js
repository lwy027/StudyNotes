const express = require("express");

const app = express();

app.use(express.json());
app.post("/login", (req, res, next) => {
  //获取参数
  const { username, password } = req.body;
  //进行逻辑判断
  if (!username || !password) {
    //参数传入错误信息
    next(-1001);
  } else if (username !== "liweiye" || password !== "123456") {
    next(-1002);
  } else {
    res.json({
      code: 0,
      message: "登录成功,欢迎回来",
      token: "2d2d1d5dd5c5s8",
    });
  }
});

//错误处理的中间件
//还有第四个参数，就是对错误处理，next()中的参数就是发送错误信息
app.use((err, req, res, next) => {
  const code = err;
  let message = "";
  switch (code) {
    case -1001:
      message = "账号和密码不能为空";
      break;
    case -1002:
      message = "您的账号密码错误";
      break;
  }
  res.json({ code, message });
});

app.listen(9000, () => {
  console.log("服务器开启");
});
