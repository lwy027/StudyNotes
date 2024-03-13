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
exports.SwaggerController = void 0;
const common_1 = require("@nestjs/common");
const User_dto_1 = require("./dto/User.dto");
const swagger_1 = require("@nestjs/swagger");
let SwaggerController = class SwaggerController {
    aaa() {
        return 'success';
    }
    bbb(a1, a2) {
        return {
            a1,
            a2,
        };
    }
    ccc(user) {
        return user;
    }
};
exports.SwaggerController = SwaggerController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '测试aaa', description: 'aaa描述' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        description: 'aaa请求成功',
        type: String,
    }),
    (0, common_1.Get)('aaa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SwaggerController.prototype, "aaa", null);
__decorate([
    (0, swagger_1.ApiQuery)({
        name: 'a1',
        type: String,
        description: 'a1 param',
        required: false,
        example: '1111',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'a2',
        type: String,
        description: 'a2 param',
        required: false,
        example: '1111',
    }),
    (0, common_1.Get)('bbb'),
    __param(0, (0, common_1.Query)('a1')),
    __param(1, (0, common_1.Query)('a2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SwaggerController.prototype, "bbb", null);
__decorate([
    (0, swagger_1.ApiBody)({
        type: User_dto_1.UserDto,
    }),
    (0, common_1.Post)('ccc'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_dto_1.UserDto]),
    __metadata("design:returntype", void 0)
], SwaggerController.prototype, "ccc", null);
exports.SwaggerController = SwaggerController = __decorate([
    (0, common_1.Controller)('swagger')
], SwaggerController);
//# sourceMappingURL=swagger.controller.js.map