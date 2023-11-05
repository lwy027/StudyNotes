//这里应该根据当前动态的id和它所关联的用户id结合相查询

const { OPERATION_IS_NOT_ALLOWED } = require("../config/error");
const permissionService = require("../service/permissionService");

//如果联合查询有结果，那么允许通过，如果没有提示没有对应权限
// const verifyContentPermission = async (ctx, netx) => {
//   const { id } = ctx.user;
//   const keyName = Object.keys(ctx.params)[0];
//   const resourceId = ctx.params[keyName];
//   const resourceName = keyName.replace("Id", "");

//   //数据库查询当前动态id和用户id是否匹配
//   const isPermission = await permissionService.checkMoment(
//     resourceId,
//     resourceName,
//     id
//   );
//   if (!isPermission) {
//     return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
//   }
//   await netx();
// };
const verifyPermission = async (ctx, netx) => {
  const { id } = ctx.user;
  //从params中取出我们的动态路径，对路径进行解析，传入执行数据库方法中根据传入的路径进行查询不同的表
  //需要我们在设置动态参数名时统一规范，比如:contentId ,前面是表的名称后面是Id
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");

  //数据库查询当前动态id和用户id是否匹配
  const isPermission = await permissionService.checkResoure(
    resourceId,
    resourceName,
    id
  );
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx);
  }
  await netx();
};
module.exports = verifyPermission;
