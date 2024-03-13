import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from './user/user.service';
import { Reflector } from '@nestjs/core';
export declare class PermissionGuard implements CanActivate {
    userSevice: UserService;
    reflection: Reflector;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
