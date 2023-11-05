const contentService = require("../service/content.service");

class contentController {
  async create(ctx, next) {
    //1.获取动态内容
    const { content } = ctx.request.body;
    //2.动态由谁发布
    const { id } = ctx.user;
    //3.执行数据库
    const res = await contentService.create(content, id);
    //4.创建成功
    ctx.body = {
      code: 0,
      data: {
        message: "创建动态成功~",
        res,
      },
    };
  }
  async list(ctx, next) {
    //数据库查询
    const { offset, size } = ctx.query;
    const res = await contentService.getQueryList(offset, size);
    ctx.body = {
      code: 0,
      data: {
        message: "获取列表成功",
        res,
      },
    };
  }

  async detail(ctx, next) {
    //根据id查询动态详情
    const { id } = ctx.params;
    const res = await contentService.getListById(id);

    ctx.body = {
      code: 0,
      data: {
        res,
      },
    };
  }
  async updata(ctx, next) {
    const { contentId } = ctx.params;
    const { content } = ctx.request.body;
    //查询数据库
    const res = await contentService.updataById(content, contentId);
    ctx.body = {
      code: 0,
      message: "更改成功",
      data: { res },
    };
  }
  async deleteContent(ctx, next) {
    const { contentId } = ctx.params;
    console.log(contentId);
    //查询数据库
    const res = await contentService.deleteById(contentId);
    ctx.body = {
      code: 0,
      message: "删除成功",
      data: { res },
    };
  }
}

module.exports = new contentController();
