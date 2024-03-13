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
exports.NestDecoratorController = void 0;
const common_1 = require("@nestjs/common");
const nest_decorator_service_1 = require("./nest_decorator.service");
const catch_filter_1 = require("./catch/catch.filter");
const metadata_guard_1 = require("./metadata/metadata.guard");
let NestDecoratorController = class NestDecoratorController {
    constructor(nestDecoratorService) {
        this.nestDecoratorService = nestDecoratorService;
    }
    Hello() {
        console.log(this.aaaService);
        return 'Hello decorator';
    }
    filter() {
        throw new common_1.HttpException('当前出现http错误', 400);
    }
    metadata() {
        return '获取metadata数据成功';
    }
    header(accept, headers) {
        return headers;
    }
    ip(ip) {
        console.log(ip);
        return ip;
    }
    session(session) {
        if (!session.count) {
            session.count = 0;
        }
        session.count++;
        return session;
    }
};
exports.NestDecoratorController = NestDecoratorController;
__decorate([
    (0, common_1.Inject)('li'),
    (0, common_1.Optional)(),
    __metadata("design:type", Object)
], NestDecoratorController.prototype, "aaaService", void 0);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NestDecoratorController.prototype, "Hello", null);
__decorate([
    (0, common_1.Get)('filter'),
    (0, common_1.UseFilters)(catch_filter_1.CatchFilter),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NestDecoratorController.prototype, "filter", null);
__decorate([
    (0, common_1.SetMetadata)('roles', ['admin']),
    (0, common_1.UseGuards)(metadata_guard_1.MetadataGuard),
    (0, common_1.Get)('metadata'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NestDecoratorController.prototype, "metadata", null);
__decorate([
    (0, common_1.Get)('header'),
    __param(0, (0, common_1.Headers)('accept')),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NestDecoratorController.prototype, "header", null);
__decorate([
    (0, common_1.Get)('ip'),
    __param(0, (0, common_1.Ip)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NestDecoratorController.prototype, "ip", null);
__decorate([
    (0, common_1.Get)('session'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NestDecoratorController.prototype, "session", null);
exports.NestDecoratorController = NestDecoratorController = __decorate([
    (0, common_1.Controller)('nest-decorator'),
    (0, common_1.SetMetadata)('roles', ['users']),
    __metadata("design:paramtypes", [nest_decorator_service_1.NestDecoratorService])
], NestDecoratorController);
//# sourceMappingURL=nest_decorator.controller.js.map