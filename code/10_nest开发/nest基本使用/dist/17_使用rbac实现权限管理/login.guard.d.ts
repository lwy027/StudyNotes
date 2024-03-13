import { CanActivate, ExecutionContext } from '@nestjs/common';
declare module 'express' {
    interface Request {
        user: {
            username: string;
            roles: Role[];
        };
    }
}
import { Observable } from 'rxjs';
import { Role } from './user/entities/role.entity';
import { Reflector } from '@nestjs/core';
export declare class LoginGuard implements CanActivate {
    private jwtService;
    reflection: Reflector;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
