import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class PermissionGuard implements CanActivate {
    reflection: Reflector;
    private userService;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
