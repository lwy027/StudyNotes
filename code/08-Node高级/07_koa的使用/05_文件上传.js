const Koa = require("koa");
const multer = require("koa-multer");
const Router = require("@koa/router");

const app = new Koa();

const avaRouter = new Router({ prefix: "/upload" });

const upload = multer({
  // dest: "./upload",
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
avaRouter.post("/", upload.single("avatar"), (ctx, next) => {
  console.log(ctx.request.file);
  ctx.body = "文件上传成功";
});

//多文件上传
avaRouter.post("/photos", upload.array("photos"), (ctx, next) => {
  console.log(ctx.req.files);
  ctx.body = "文件上传成功";
});

app.use(avaRouter.routes());
app.use(avaRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务开启成功");
});
