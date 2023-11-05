const Router = require("@koa/router");
const { verifyAuth } = require("../middlewara/login.middlewara");
const {
  create,
  list,
  detail,
  updata,
  deleteContent,
} = require("../controller/content.controller");
const verifyPermission = require("../middlewara/content.middlewara");

const contentRouter = new Router({ prefix: "/content" });

//增
contentRouter.post("/", verifyAuth, create);
//查
contentRouter.get("/", list);
contentRouter.get("/:id", detail);
//删
contentRouter.delete(
  "/:contentId",
  verifyAuth,
  verifyPermission,
  deleteContent
);

//改 这样更改是不好的，因为当前用户可能会更改别人的动态，所以我们应该加上权限认证的操作
// contentRouter.patch("/:contentId", verifyAuth, updata);
contentRouter.patch("/:contentId", verifyAuth, verifyPermission, updata);

module.exports = contentRouter;
