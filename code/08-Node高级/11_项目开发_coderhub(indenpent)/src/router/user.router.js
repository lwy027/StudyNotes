const Router = require("@koa/router");
const userRouter = new Router({ prefix: "/user" });

const userController = require("../controller/user_controller");
const { verfyUser, handlePassword } = require("../middlewara/user_middlewara");

userRouter.post("/", verfyUser, handlePassword, userController.create);

module.exports = userRouter;
