const userService = require("../app/dtabase");

class userController {
  async create(ctx, next) {
    //1.拿到数据进行解析
    const user = ctx.request.body;

    //2.把信息保存在数据库
    const res = await userService.create(user);
    ctx.body = {
      message: "创建用户成功~",
      res,
    };
  }
}

module.exports = new userController();
