const express = require("express");

const app = express();

app.get("/home", (req, res) => {
  console.log("match method / home");
  res.end("mathch method/home");
});

app.listen(8000, () => {
  console.log("服务开启");
});
