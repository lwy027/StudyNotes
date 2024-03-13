import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
declare module 'express-session' {
    interface Session {
        user: {
            username: string;
        };
    }
}
export declare class LoginGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
