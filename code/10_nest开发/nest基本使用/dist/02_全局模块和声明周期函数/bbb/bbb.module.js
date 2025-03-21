"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BbbModule = void 0;
const common_1 = require("@nestjs/common");
const bbb_service_1 = require("./bbb.service");
const bbb_controller_1 = require("./bbb.controller");
let BbbModule = class BbbModule {
    onModuleInit() {
        console.log('BbbModule onModuleInit');
    }
    beforeApplicationShutdown(signal) {
        console.log('BbbModule beforeApplicationShutdown', signal);
    }
    onApplicationShutdown() {
        console.log('BbbModule onApplicationShutdown');
    }
    onModuleDestroy() {
        console.log('BbbModule OnModuleDestroy');
    }
    onApplicationBootstrap() {
        console.log('BbbModule onApplicationBootstrap');
    }
};
exports.BbbModule = BbbModule;
exports.BbbModule = BbbModule = __decorate([
    (0, common_1.Module)({
        controllers: [bbb_controller_1.BbbController],
        providers: [bbb_service_1.BbbService],
    })
], BbbModule);
//# sourceMappingURL=bbb.module.js.map