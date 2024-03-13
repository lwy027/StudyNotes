"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user/user.service");
const core_1 = require("@nestjs/core");
let PermissionGuard = class PermissionGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (!request.user) {
            return true;
        }
        const roles = await this.userSevice.findRolesByIds(request.user.roles.map((item) => item.id));
        const permissions = roles.reduce((total, current) => {
            total.push(...current.permissions);
            return total;
        }, []);
        console.log(permissions);
        const requiredPermissions = this.reflection.getAllAndOverride('require-permission', [context.getClass(), context.getHandler()]);
        console.log(requiredPermissions);
        for (let i = 0; i < requiredPermissions.length; i++) {
            const curPermission = requiredPermissions[i];
            const found = permissions.find((item) => item.name === curPermission);
            if (!found) {
                throw new common_1.UnauthorizedException('您没有访问该接口的权限');
            }
        }
        return true;
    }
};
exports.PermissionGuard = PermissionGuard;
__decorate([
    (0, common_1.Inject)(user_service_1.UserService),
    __metadata("design:type", user_service_1.UserService)
], PermissionGuard.prototype, "userSevice", void 0);
__decorate([
    (0, common_1.Inject)(core_1.Reflector),
    __metadata("design:type", core_1.Reflector)
], PermissionGuard.prototype, "reflection", void 0);
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)()
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map