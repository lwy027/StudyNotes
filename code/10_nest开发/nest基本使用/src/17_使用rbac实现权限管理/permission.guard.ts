import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { Request } from 'express';
import { Permission } from './user/entities/permission.entity';
import { Reflector } from '@nestjs/core';
@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  userSevice: UserService;

  @Inject(Reflector)
  reflection: Reflector;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //查看当前的用户是否有对应的权限访问接口

    const request: Request = context.switchToHttp().getRequest();

    if (!request.user) {
      return true;
    }
    //从request中获取roles中的id
    const roles = await this.userSevice.findRolesByIds(
      request.user.roles.map((item) => item.id),
    );
    const permissions: Permission[] = roles.reduce((total, current) => {
      total.push(...current.permissions);
      return total;
    }, []);
    console.log(permissions);

    //获取当前访问路由,判断当当前用户是否有对应的权限
    const requiredPermissions = this.reflection.getAllAndOverride<string[]>(
      'require-permission',
      [context.getClass(), context.getHandler()],
    );

    console.log(requiredPermissions);
    for (let i = 0; i < requiredPermissions.length; i++) {
      const curPermission = requiredPermissions[i];
      const found = permissions.find((item) => item.name === curPermission);
      if (!found) {
        throw new UnauthorizedException('您没有访问该接口的权限');
      }
    }

    return true;
  }
}
