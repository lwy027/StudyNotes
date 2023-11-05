const Router = require("@koa/router");
const { verifyAuth } = require("../middlewara/login.middlewara");
const { create, reply } = require("../controller/comment.controller");
const commentRouter = new Router({ prefix: "/comment" });

commentRouter.post("/", verifyAuth, create);
commentRouter.post("/reply", verifyAuth, reply);

module.exports = commentRouter;
