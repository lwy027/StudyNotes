const express = require("express");
const multer = require("multer");
const app = express();

const upload = multer({
  // dest: "./upload",
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./upload");
    },
    filename(req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

app.post("/photos", upload.array("photos"), (req, res) => {
  console.log(req.file);
  res.end("文件上传成功");
});

app.listen(8000, () => {
  console.log("服务开启成功");
});
