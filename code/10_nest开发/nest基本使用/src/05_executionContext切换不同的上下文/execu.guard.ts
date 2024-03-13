import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class ExecuGuard implements CanActivate {
  @Inject(Reflector)
  reflector: Reflector;
  /**
   *
   * @param context ExecutionContext 是 ArgumentHost 的子类，扩展了 getClass、getHandler 方法
   * 之所以扩展这2个方法是因为，在guard和interceptor中我们可以需要获取,class和它中的handle一些元数据
   * 比如当前角色的权限等
   * @returns
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //借助reflector可以获取当前请求用户的角色也就是设置setMatedata中的数据，然后根据用户的角色可以做一些判断逻辑
    const role = this.reflector.get('roles', context.getHandler());
    console.log(role);
    return true;
  }
}
