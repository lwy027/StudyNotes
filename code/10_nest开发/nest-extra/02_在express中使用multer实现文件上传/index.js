const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

app.use(cors());

app.use(express.static("./index.html"));

const uploads = multer({
  dest: "upload/",
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "upload/");
    },
    filename(req, file, cb) {
      const fileName = file.originalname;
      const nowDate = Date.now();
      cb(null, `${nowDate} - ${fileName}`);
    },
  }),
});

//单个上传
// app.post("/aaa", uploads.single("avator"), (req, res, next) => {
//   console.log("req.file", req.file);
//   console.log("req.body", req.body);

//   res.json({
//     message: "文件上传成功",
//   });
// });

//多个上传
// app.post("/aaa", uploads.array("avator"), (req, res, next) => {
//   console.log("req.file", req.files);
//   console.log("req.body", req.body);

//   res.json({
//     message: "文件上传成功",
//   });
// });

//指定多个字段上传
app.post(
  "/aaa",
  uploads.fields([
    { name: "aaa", maxCount: 3 },
    { name: "bbb", maxCount: 2 },
  ]),
  (req, res, next) => {
    console.log("req.file", req.files);
    console.log("req.body", req.body);

    res.json({
      message: "文件上传成功",
    });
  }
);

//对接收的文件不做任何限制
app.post("/aaa", uploads.any(), (req, res, next) => {
  console.log("req.file", req.files);
  console.log("req.body", req.body);

  res.json({
    message: "文件上传成功",
  });
});

app.listen(8000, () => {
  console.log("8000端口开启成功~");
});
