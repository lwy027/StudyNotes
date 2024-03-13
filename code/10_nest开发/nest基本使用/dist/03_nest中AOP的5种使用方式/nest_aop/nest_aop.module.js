"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestAopModule = void 0;
const common_1 = require("@nestjs/common");
const nest_aop_service_1 = require("./nest_aop.service");
const nest_aop_controller_1 = require("./nest_aop.controller");
const log_middleware_1 = require("./log.middleware");
const timer_interceptor_1 = require("./timer.interceptor");
const validate_pipe_1 = require("./validate.pipe");
let NestAopModule = class NestAopModule {
    configure(consumer) {
        consumer.apply(log_middleware_1.LogMiddleware).forRoutes('aaa*');
    }
};
exports.NestAopModule = NestAopModule;
exports.NestAopModule = NestAopModule = __decorate([
    (0, common_1.Module)({
        controllers: [nest_aop_controller_1.NestAopController],
        providers: [
            nest_aop_service_1.NestAopService,
            {
                provide: 'APP_INTERCEPTOR',
                useClass: timer_interceptor_1.TimerInterceptor,
            },
            {
                provide: 'APP_PIPE',
                useClass: validate_pipe_1.ValidatePipe,
            },
        ],
    })
], NestAopModule);
//# sourceMappingURL=nest_aop.module.js.map