"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_service_1 = require("./22_\u4F7F\u7528prisma/prisma.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController],
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: app_service_1.AppService,
                useClass: app_service_1.AppService,
            },
            {
                provide: 'person',
                useValue: {
                    name: '小明',
                    age: 20,
                },
            },
            {
                provide: 'person2',
                useFactory() {
                    return { desc: 'aaa', name: 'ccc' };
                },
            },
            {
                provide: 'person3',
                useFactory(person, appService) {
                    return { desc: appService.getHello(), name: person.name };
                },
                inject: ['person', app_service_1.AppService],
            },
            {
                provide: 'person5',
                async useFactory(person, appService) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, 3000);
                    });
                    return { desc: appService.getHello(), name: person.name };
                },
                inject: ['person', app_service_1.AppService],
            },
            {
                provide: 'person4',
                useExisting: 'person2',
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map