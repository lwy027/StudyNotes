import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class MetadataGuard implements CanActivate {
  @Inject(Reflector)
  reflector: Reflector;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //使用reflector可以获取controllter和handle中的metadata数据
    const classMetadata = this.reflector.get('roles', context.getClass());
    const handleMetadata = this.reflector.get('roles', context.getHandler());
    console.log(classMetadata);
    console.log(handleMetadata);
    return true;
  }
}
