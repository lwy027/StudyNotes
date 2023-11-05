const express = require("express");

const app = express();
//使用普通中间件对请求的数据进行拦截处理
app.use((req, res, next) => {
  const header = req.headers;
  if (header["content-type"] === "application/json") {
    req.on("data", (data) => {
      const dataString = data.toString();
      const userInfo = JSON.parse(dataString);
      //在req上添加数据，这样下一个中间件使用时就可以通过body获取数据
      req.body = userInfo;
    });
    req.on("end", () => {
      next();
    });
  } else {
    next();
  }
});
//上面的代码等同与express.json(),express框架内部已经为我们提供好把数据转换成json的中间件了
app.use(express.json());

app.post("/login", (req, res) => {
  console.log(req.body);
});

app.post("/register", (req, res) => {
  console.log(req.body);
  res.end("注册成功");
});

app.listen(8000, () => {
  console.log("express服务开启成功");
});
