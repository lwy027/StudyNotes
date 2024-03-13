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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./22_\u4F7F\u7528prisma/prisma.service");
let AppController = class AppController {
    constructor(appService, person, person2, person3, person4, person5) {
        this.appService = appService;
        this.person = person;
        this.person2 = person2;
        this.person3 = person3;
        this.person4 = person4;
        this.person5 = person5;
    }
    async create() {
        const id = await this.prisma.department.create({
            data: {
                name: '技术部',
            },
            select: {
                id: true,
            },
        });
        const employee = await this.prisma.employee.create({
            data: {
                name: '张三',
                phone: '192929',
                department: {
                    connect: id,
                },
            },
            select: {
                id: true,
                name: true,
                phone: true,
            },
        });
        return {
            id,
            employee,
        };
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Inject)(prisma_service_1.PrismaService),
    __metadata("design:type", prisma_service_1.PrismaService)
], AppController.prototype, "prisma", void 0);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, common_1.Inject)('person')),
    __param(2, (0, common_1.Inject)('person2')),
    __param(3, (0, common_1.Inject)('person3')),
    __param(4, (0, common_1.Inject)('person4')),
    __param(5, (0, common_1.Inject)('person5')),
    __metadata("design:paramtypes", [app_service_1.AppService, Object, Object, Object, Object, Object])
], AppController);
//# sourceMappingURL=app.controller.js.map