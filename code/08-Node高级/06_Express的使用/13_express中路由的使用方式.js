const express = require("express");
const userRouter = require("./routes/userRouter");
const app = express();

/**用户的接口*/
//以前的方式
//1.将用户的接口直接定义在app中
//app.get('/users',(req,res,next)=>{})
//app.get('/users/:id',(req,res,next)=>{})
//app.post('/users',(req,res,next)=>{})
//app.delete('/users/:id',(req,res,next)=>{})
//app.patch('/users/:id',(req,res,next)=>(}

//让路由生效
//将路由以中间件的方式使用，这样当匹配到user请求时，会在路由中查找
app.use("/users", userRouter);

app.listen(9000, () => {
  console.log("开启服务");
});
