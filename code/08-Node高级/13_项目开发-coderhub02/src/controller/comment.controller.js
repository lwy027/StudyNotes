const commentService = require("../service/comment.service");

class commentCntroller {
  async create(ctx, next) {
    //1.拿到评论的信息和在谁的 评论下评论的id
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;

    //2.进行数据库插入操作
    const res = await commentService.create(content, momentId, id);
    ctx.body = {
      code: 0,
      message: "创建评论成功",
      data: {
        res,
      },
    };
  }
  async reply(ctx, next) {
    //1.拿到评论的信息和在谁的 评论下评论的id
    //commentID是记录在哪个评论底下回复评论的
    //momentId是当前的评论id
    const { content, momentId, commentId } = ctx.request.body;
    const { id } = ctx.user;
    //2.进行数据库插入操作
    const res = await commentService.reply(content, momentId, commentId, id);
    ctx.body = {
      code: 0,
      message: "创建评论成功",
      data: {
        res,
      },
    };
  }
}

module.exports = new commentCntroller();
