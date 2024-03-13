"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestDecoratorModule = void 0;
const common_1 = require("@nestjs/common");
const nest_decorator_service_1 = require("./nest_decorator.service");
const nest_decorator_controller_1 = require("./nest_decorator.controller");
const aaa_controller_1 = require("./aaa.controller");
let NestDecoratorModule = class NestDecoratorModule {
};
exports.NestDecoratorModule = NestDecoratorModule;
exports.NestDecoratorModule = NestDecoratorModule = __decorate([
    (0, common_1.Module)({
        controllers: [nest_decorator_controller_1.NestDecoratorController, aaa_controller_1.AaaController],
        providers: [nest_decorator_service_1.NestDecoratorService],
    })
], NestDecoratorModule);
//# sourceMappingURL=nest_decorator.module.js.map