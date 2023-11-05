const fs = require("fs");

fs.rename("./lwy", "./aaa", (err) => {
  console.log("更名成功");
});
