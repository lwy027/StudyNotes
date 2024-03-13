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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const userLogin_dto_1 = require("./dto/userLogin.dto");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const role_entity_1 = require("./entities/role.entity");
const user_entity_1 = require("./entities/user.entity");
const permission_entity_1 = require("./entities/permission.entity");
const jwt_1 = require("@nestjs/jwt");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async initData() {
        const user1 = new user_entity_1.User();
        user1.username = '张三';
        user1.password = '111111';
        const user2 = new user_entity_1.User();
        user2.username = '李四';
        user2.password = '222222';
        const user3 = new user_entity_1.User();
        user3.username = '王五';
        user3.password = '333333';
        const role1 = new role_entity_1.Role();
        role1.name = '管理员';
        const role2 = new role_entity_1.Role();
        role2.name = '普通用户';
        const permission1 = new permission_entity_1.Permission();
        permission1.name = '新增 aaa';
        const permission2 = new permission_entity_1.Permission();
        permission2.name = '修改 aaa';
        const permission3 = new permission_entity_1.Permission();
        permission3.name = '删除 aaa';
        const permission4 = new permission_entity_1.Permission();
        permission4.name = '查询 aaa';
        const permission5 = new permission_entity_1.Permission();
        permission5.name = '新增 bbb';
        const permission6 = new permission_entity_1.Permission();
        permission6.name = '修改 bbb';
        const permission7 = new permission_entity_1.Permission();
        permission7.name = '删除 bbb';
        const permission8 = new permission_entity_1.Permission();
        permission8.name = '查询 bbb';
        role1.permissions = [
            permission1,
            permission2,
            permission3,
            permission4,
            permission5,
            permission6,
            permission7,
            permission8,
        ];
        role2.permissions = [permission1, permission2, permission3, permission4];
        user1.roles = [role1];
        user2.roles = [role2];
        await this.entityManager.save(permission_entity_1.Permission, [
            permission1,
            permission2,
            permission3,
            permission4,
            permission5,
            permission6,
            permission7,
            permission8,
        ]);
        await this.entityManager.save(role_entity_1.Role, [role1, role2]);
        await this.entityManager.save(user_entity_1.User, [user1, user2]);
    }
    async login(userInfo) {
        const user = await this.userService.login(userInfo);
        console.log(userInfo);
        const token = this.jwtService.sign({
            user: {
                username: user.username,
                roles: user.roles,
            },
        });
        return {
            code: 200,
            token,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, typeorm_2.InjectEntityManager)(),
    __metadata("design:type", typeorm_1.EntityManager)
], UserController.prototype, "entityManager", void 0);
__decorate([
    (0, common_1.Inject)(jwt_1.JwtService),
    __metadata("design:type", jwt_1.JwtService)
], UserController.prototype, "jwtService", void 0);
__decorate([
    (0, common_1.Get)('init'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "initData", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userLogin_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map