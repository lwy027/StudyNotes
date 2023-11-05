const express = require("express");
//2.将用户的接口单独定义在路由对象中
//创建路由
const userRouter = express.Router();
userRouter.get("/", (req, res) => {
  res.json("用户列表");
});
userRouter.post("/:id", (req, res) => {
  res.json("新建用户" + req.params.id);
});
userRouter.patch("/:id", (req, res) => {
  res.json("更改用户" + req.params.id);
});
userRouter.delete("/:id", (req, res) => {
  res.json("删除用户" + req.params.id);
});
//将路由导出
module.exports = userRouter;
