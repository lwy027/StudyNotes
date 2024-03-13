/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { NestAopService } from './nest_aop.service';

@Injectable()
export class LoginGuard implements CanActivate {
  //只有把当前守卫放在provider中才可以实现依赖注入
  @Inject(NestAopService)
  nestAopService: NestAopService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //context
    console.log('loginGuard', this.nestAopService.findAll());
    //返回false不通过，返回true通过验证
    return false;
  }
}
