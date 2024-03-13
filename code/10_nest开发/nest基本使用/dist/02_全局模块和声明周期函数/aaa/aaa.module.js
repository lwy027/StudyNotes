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
exports.AaaModule = void 0;
const common_1 = require("@nestjs/common");
const aaa_service_1 = require("./aaa.service");
const aaa_controller_1 = require("./aaa.controller");
const core_1 = require("@nestjs/core");
let AaaModule = class AaaModule {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
    }
    onModuleDestroy() {
        console.log('AaaModule OnModuleDestroy');
    }
    onApplicationShutdown() {
        console.log('AaaModule onApplicationShutdown');
    }
    beforeApplicationShutdown(signal) {
        const aaaService = this.moduleRef.get(aaa_service_1.AaaService);
        console.log('--------------------------', aaaService.findAll());
        console.log('AaaModule beforeApplicationShutdown', signal);
    }
    onModuleInit() {
        console.log('AaaModule onModuleInit');
    }
    onApplicationBootstrap() {
        console.log('AaaModule onApplicationBootstrap');
    }
};
exports.AaaModule = AaaModule;
exports.AaaModule = AaaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        controllers: [aaa_controller_1.AaaController],
        providers: [aaa_service_1.AaaService],
        exports: [aaa_service_1.AaaService],
    }),
    __metadata("design:paramtypes", [core_1.ModuleRef])
], AaaModule);
//# sourceMappingURL=aaa.module.js.map