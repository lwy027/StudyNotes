const express = require("express");

const app = express();
const userRouter = express.Router();
app.use("/", (req, res, next) => {
  console.log("请求成功");
  next();
});

userRouter.get("/list", (req, res) => {
  console.log(req.headers);
  res.json([
    {
      name: "james",
      age: 20,
    },
    {
      name: "curry",
      age: 52,
    },
    {
      name: "tom",
      age: 30,
    },
  ]);
});
app.use("/users", userRouter);

app.listen(9000, () => {
  console.log("express");
});
