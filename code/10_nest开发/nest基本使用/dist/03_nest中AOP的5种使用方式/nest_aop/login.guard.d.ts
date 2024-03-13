import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { NestAopService } from './nest_aop.service';
export declare class LoginGuard implements CanActivate {
    nestAopService: NestAopService;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
