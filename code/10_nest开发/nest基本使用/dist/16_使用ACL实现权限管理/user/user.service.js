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
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    async login(user) {
        const userInfo = await this.manger.findOneBy(user_entity_1.User, {
            username: user.name,
        });
        if (!userInfo) {
            throw new common_1.HttpException('用户不存在', common_1.HttpStatus.ACCEPTED);
        }
        if (user.password !== userInfo.password) {
            throw new common_1.HttpException('用户密码错误，请重新输入', common_1.HttpStatus.ACCEPTED);
        }
        return userInfo;
    }
    async findByUsername(username) {
        const user = await this.manger.findOne(user_entity_1.User, {
            where: {
                username,
            },
            relations: {
                permissions: true,
            },
        });
        return user;
    }
};
exports.UserService = UserService;
__decorate([
    (0, typeorm_2.InjectEntityManager)(),
    __metadata("design:type", typeorm_1.EntityManager)
], UserService.prototype, "manger", void 0);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map