const Koa = require("koa");
const Router = require("@koa/router");
const multer = require("koa-multer");
const app = new Koa();
const userRouter = new Router({
  prefix: "/upload",
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

userRouter.post("/avatar", upload.single("avatar"), (ctx, next) => {
  console.log(ctx.req.file);
  ctx.body = "文件上传成功";
});
userRouter.post("/photos", upload.array("photos"), (ctx, next) => {
  console.log(ctx.req.files);
  ctx.body = "文件上传成功";
});

app.use(userRouter.routes());

app.listen(8000, () => {
  console.log("开启服务器成功");
});
