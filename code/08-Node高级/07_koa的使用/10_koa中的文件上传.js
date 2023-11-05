const Koa = require("koa");
const multer = require("koa-multer");
const Router = require("@koa/router");

const app = new Koa();
const userRouter = new Router({
  prefix: "/users",
});
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./upload");
    },
    filename(req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
});

//单文件上传
userRouter.post("/avatar", upload.single("avatar"), (ctx, next) => {
  console.log(ctx.req.file);
  ctx.body = "文件上传成功";
});
//多文件上传
userRouter.post("/photos", upload.array("photos"), (ctx, next) => {
  console.log(ctx.req.files);
  ctx.body = "文件上传成功";
});

app.use(userRouter.routes());

app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务开启成功");
});
