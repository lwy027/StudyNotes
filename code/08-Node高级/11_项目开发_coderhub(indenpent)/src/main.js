const app = require("./app/app");
const SERVER_PORT = require("./config/service");
require("./utils/handle_error");
app.listen(SERVER_PORT, () => {
  console.log("coderhub项目启动成功~");
});
