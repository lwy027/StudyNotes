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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtController = class JwtController {
    jwt(res) {
        const newToken = this.jwtService.sign({
            count: 1,
        });
        res.setHeader('token', newToken);
        return '颁发token成功';
    }
    login(authorization, res) {
        if (authorization) {
            try {
                const token = authorization.split(' ')[1];
                const data = this.jwtService.verify(token);
                const newtoken = this.jwtService.sign({
                    count: data.count++,
                });
                res.setHeader('token', newtoken);
                return data.count++;
            }
            catch (error) {
                console.log(error);
                throw new common_1.UnauthorizedException();
            }
        }
        else {
            const newToken = this.jwtService.sign({
                count: 1,
            });
            res.setHeader('token', newToken);
            return 1;
        }
    }
};
exports.JwtController = JwtController;
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], JwtController.prototype, "jwtService", void 0);
__decorate([
    (0, common_1.Get)('register'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], JwtController.prototype, "jwt", null);
__decorate([
    (0, common_1.Get)('login'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], JwtController.prototype, "login", null);
exports.JwtController = JwtController = __decorate([
    (0, common_1.Controller)('jwt')
], JwtController);
//# sourceMappingURL=jwt.controller.js.map