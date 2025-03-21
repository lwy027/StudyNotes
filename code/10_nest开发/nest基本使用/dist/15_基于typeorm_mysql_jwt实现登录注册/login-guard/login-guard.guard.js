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
exports.LoginGuardGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let LoginGuardGuard = class LoginGuardGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.header('authorization') || '';
        const bearer = authorization.split(' ');
        if (!bearer || bearer.length < 2) {
            throw new common_1.UnauthorizedException('登录token错误');
        }
        const token = bearer[1];
        try {
            const info = this.jwtService.verify(token);
            request.user = info.user;
            return true;
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException(' 登录token失效,请重新登录');
        }
    }
};
exports.LoginGuardGuard = LoginGuardGuard;
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], LoginGuardGuard.prototype, "jwtService", void 0);
exports.LoginGuardGuard = LoginGuardGuard = __decorate([
    (0, common_1.Injectable)()
], LoginGuardGuard);
//# sourceMappingURL=login-guard.guard.js.map