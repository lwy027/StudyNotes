const express = require("express");

const app = express();

app.get(
  "/home",
  (req, res, next) => {
    console.log("home / get 01");
    next();
  },
  (req, res, next) => {
    console.log("home / get 02");
    next();
  }
);

//
app.use((req, res, next) => {
  console.log("normal middlewarw01");
  next();
});
app.use((req, res, next) => {
  console.log("normal middlewarw02");
  next();
});

app.listen(8000, () => {
  console.log("服务器开启成功...");
});
