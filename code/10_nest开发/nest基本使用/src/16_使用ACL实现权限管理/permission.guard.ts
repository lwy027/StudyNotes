import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user/user.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(Reflector)
  reflection: Reflector;

  @Inject(UserService)
  private userService: UserService;
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const user = request.session.user;
    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }

    const permission = this.reflection.get('permission', context.getHandler());
    console.log(permission);

    const foundUser = await this.userService.findByUsername(user.username);
    console.log(foundUser);
    if (foundUser.permissions.some((item) => item.name == permission)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问当前接口');
    }
  }
}
