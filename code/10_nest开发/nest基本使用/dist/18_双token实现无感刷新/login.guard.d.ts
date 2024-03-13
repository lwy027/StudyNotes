import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
export declare class LoginGuard implements CanActivate {
    jwtService: JwtService;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
