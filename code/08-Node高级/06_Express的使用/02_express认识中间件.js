const express = require("express");

const app = express();

//给express创建的app传入一个回调函数
//传入的这个回调函数就称之为是中间件(middleware)
//app.post('/儿ogin',回调函数=>中间件)
app.post("/login", (req, res, next) => {
  //1.中间件中可以执行任何代码
  console.log("first middleWara");
  /**
   * 打印，查询数据，判断逻辑
   */
  //2.在中间件中修改req/res对象
  req.age = 99;

  //3.可以在中间件中结束响应周期,如果不主动结束请求将会一直被挂起
  res.json({ message: "欢迎回来", state: 0 });

  //4.执行下一个中间件，会找下一个匹配的中间件
  next();
});

//注册一个中间件
app.use((req, res) => {
  console.log("second middlewara");
});

app.listen(8000, () => {
  console.log("开启服务");
});
