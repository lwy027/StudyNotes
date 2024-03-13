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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const role_entity_1 = require("./entities/role.entity");
let UserService = class UserService {
    async login(user) {
        console.log(user);
        const userInfo = await this.entityManger.findOne(user_entity_1.User, {
            where: {
                username: user.name,
            },
            relations: {
                roles: true,
            },
        });
        if (!userInfo) {
            throw new common_1.HttpException('当前用户不存在', common_1.HttpStatus.ACCEPTED);
        }
        if (user.password !== userInfo.password) {
            throw new common_1.HttpException('密码错误', common_1.HttpStatus.ACCEPTED);
        }
        return userInfo;
    }
    findRolesByIds(rolesId) {
        return this.entityManger.find(role_entity_1.Role, {
            where: {
                id: (0, typeorm_1.In)(rolesId),
            },
            relations: {
                permissions: true,
            },
        });
    }
};
exports.UserService = UserService;
__decorate([
    (0, typeorm_2.InjectEntityManager)(),
    __metadata("design:type", typeorm_1.EntityManager)
], UserService.prototype, "entityManger", void 0);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map