import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  @Inject(JwtService)
  jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //登录守卫验证,对请求携带token进行验证

    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.header('authorization') || '';

    const bearer = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new UnauthorizedException('登录token错误');
    }

    const token = bearer[1];

    try {
      const info = this.jwtService.verify(token);
      (request as any).user = info.user;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException(' 登录token失效,请重新登录');
    }
  }
}
