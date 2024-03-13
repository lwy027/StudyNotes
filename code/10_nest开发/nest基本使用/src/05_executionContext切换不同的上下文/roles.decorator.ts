import { SetMetadata } from '@nestjs/common';
//自定义装饰器
//  //然后在 handler 上添加这个装饰器，参数为 admin，也就是给这个 handler 添加了一个 roles 为 admin 的metadata。

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
