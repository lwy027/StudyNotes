import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaGuard implements CanActivate {
  @Inject(Reflector)
  reflector: Reflector;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //获取metadata
    const aaa = this.reflector.get('aaa', context.getHandler());
    const bbb = this.reflector.get('bbb', context.getHandler());
    console.log(aaa);
    console.log(bbb);

    return true;
  }
}
