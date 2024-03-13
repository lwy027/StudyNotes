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
exports.BbbController = void 0;
const common_1 = require("@nestjs/common");
const bbb_service_1 = require("./bbb.service");
const aaa_service_1 = require("../aaa/aaa.service");
let BbbController = class BbbController {
    constructor(bbbService, aaaService) {
        this.bbbService = bbbService;
        this.aaaService = aaaService;
    }
    onModuleInit() {
        console.log('BbbController onModuleInit');
    }
    onApplicationShutdown(signal) {
        console.log('BbbController onApplicationShutdown', signal);
    }
    beforeApplicationShutdown() {
        console.log('BbbController beforeApplicationShutdown');
    }
    onModuleDestroy() {
        console.log('BbbController OnModuleDestroy');
    }
    onApplicationBootstrap() {
        console.log('BbbController onApplicationBootstrap');
    }
};
exports.BbbController = BbbController;
exports.BbbController = BbbController = __decorate([
    (0, common_1.Controller)('bbb'),
    __metadata("design:paramtypes", [bbb_service_1.BbbService,
        aaa_service_1.AaaService])
], BbbController);
//# sourceMappingURL=bbb.controller.js.map