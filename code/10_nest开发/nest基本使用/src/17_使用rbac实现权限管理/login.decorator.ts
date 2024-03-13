import { SetMetadata } from '@nestjs/common';

export const requireLogin = () => SetMetadata('require_login', true);
export const RequirePermission = (...permissions: string[]) =>
  SetMetadata('require-permission', permissions);
