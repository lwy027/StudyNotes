const app = require("./app/app");
const { SERVER_PORT } = require("./config/server");
require("./utils/handle_error");
app.listen(SERVER_PORT, () => {
  console.log("coderHub项目开启成功~");
});
