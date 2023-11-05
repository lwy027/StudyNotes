const express = require("express");
const multer = require("multer");
const app = express();

//multer是一个函数，返回的对象中包含很多方法(中间件),single单文件上传,array多文件上传
const upload = multer({
  //接收文件放的位置,使用dest方式上传的文件保存时是不带后缀名的
  // dest: "./upload",
  //使用storage方式对文件进行设置，可以对上传的文件在保存时进行多种设置
  storage: multer.diskStorage({
    //设置文件上传的存储位置
    //req 请求信息， file文件信息，callback对文件存储地址进行设置
    destination(req, file, callback) {
      //参数一：是否有错误，参数二：写入文件地址
      callback(null, "./upload");
    },
    //文件名的设置
    filename(req, file, callback) {
      //把写入的文件名设置成当前的事件戳 + 原本的文件名
      callback(null, Date.now() + "-" + file.originalname);
    },
  }),
});
//单文件上出传
//single中的参数是文件上传时的key,不可以写错
app.post("/avatar", upload.single("avatar"), (req, res) => {
  //经过upload.single("avatar")中间件的操作，最后会把文件信息放在req.file属性中
  console.log(req.file);
  res.end("文件上传成功");
});

//多文件上传
app.post("/photos", upload.array("photos"), (req, res) => {
  //经过upload.single("avatar")中间件的操作，最后会把文件信息放在req.files属性中
  console.log(req.files);
  res.end("文件上传成功");
});

app.listen(8000, () => {
  console.log("服务开启成功");
});
