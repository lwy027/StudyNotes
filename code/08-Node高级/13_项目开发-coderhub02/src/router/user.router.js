const Router = require("@koa/router");
const userRouter = new Router({ prefix: "/user" });
const userController = require("../controller/user.controller");
const { verifyUser } = require("../middlewara/user.middlewara");
const { handlePassword } = require("../middlewara/user.middlewara");
//创建用户
userRouter.post("/", verifyUser, handlePassword, userController.create);

module.exports = userRouter;
