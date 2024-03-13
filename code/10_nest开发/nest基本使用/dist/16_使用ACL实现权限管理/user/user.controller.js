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
const typeorm_1 = require("typeorm");
const permision_entity_1 = require("./entities/permision.entity");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const login_dto_1 = require("./dto/login.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async init() {
        const permission1 = new permision_entity_1.Permission();
        permission1.name = 'create_aaa';
        permission1.desc = '新增 aaa';
        const permission2 = new permision_entity_1.Permission();
        permission2.name = 'update_aaa';
        permission2.desc = '修改 aaa';
        const permission3 = new permision_entity_1.Permission();
        permission3.name = 'remove_aaa';
        permission3.desc = '删除 aaa';
        const permission4 = new permision_entity_1.Permission();
        permission4.name = 'query_aaa';
        permission4.desc = '查询 aaa';
        const permission5 = new permision_entity_1.Permission();
        permission5.name = 'create_bbb';
        permission5.desc = '新增 bbb';
        const permission6 = new permision_entity_1.Permission();
        permission6.name = 'update_bbb';
        permission6.desc = '修改 bbb';
        const permission7 = new permision_entity_1.Permission();
        permission7.name = 'remove_bbb';
        permission7.desc = '删除 bbb';
        const permission8 = new permision_entity_1.Permission();
        permission8.name = 'query_bbb';
        permission8.desc = '查询 bbb';
        const user1 = new user_entity_1.User();
        user1.username = '东东';
        user1.password = 'aaaaaa';
        user1.permissions = [permission1, permission2, permission3, permission4];
        const user2 = new user_entity_1.User();
        user2.username = '光光';
        user2.password = 'bbbbbb';
        user2.permissions = [permission5, permission6, permission7, permission8];
        await this.manager?.save([user1, user2]);
        return '初始化用户及对应部门成员成功';
    }
    async login(user, session) {
        const userInfo = await this.userService.login(user);
        console.log(userInfo);
        session.user = {
            username: user.name,
        };
        return 'succession';
    }
};
exports.UserController = UserController;
__decorate([
    (0, typeorm_2.InjectEntityManager)(),
    __metadata("design:type", typeorm_1.EntityManager)
], UserController.prototype, "manager", void 0);
__decorate([
    (0, common_1.Get)('init'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "init", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map