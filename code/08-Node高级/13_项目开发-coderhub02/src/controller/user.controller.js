const useService = require("../app/database");

class userController {
  //用户数据库操作
  async create(ctx, next) {
    //1.获取用户信息
    const user = ctx.request.body;
    // 2.连接数据库，进行信息保存
    const result = await useService.create(user);
    //3.返回创建成功信息
    ctx.body = {
      message: "创建用户信息成功",
      data: result,
    };
  }
}

module.exports = new userController();
