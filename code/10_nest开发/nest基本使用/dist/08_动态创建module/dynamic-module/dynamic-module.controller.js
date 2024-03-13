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
exports.DynamicModuleController = void 0;
const common_1 = require("@nestjs/common");
const dynamic_module_service_1 = require("./dynamic-module.service");
let DynamicModuleController = class DynamicModuleController {
    constructor(dynamicModuleService) {
        this.dynamicModuleService = dynamicModuleService;
    }
    Aaa() {
        console.log(this.configOptions);
        return '实现DynamicModule';
    }
};
exports.DynamicModuleController = DynamicModuleController;
__decorate([
    (0, common_1.Inject)('CONFIG_OPTIONS'),
    __metadata("design:type", Object)
], DynamicModuleController.prototype, "configOptions", void 0);
__decorate([
    (0, common_1.Get)('dynamic'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DynamicModuleController.prototype, "Aaa", null);
exports.DynamicModuleController = DynamicModuleController = __decorate([
    (0, common_1.Controller)('dynamic-module'),
    __metadata("design:paramtypes", [dynamic_module_service_1.DynamicModuleService])
], DynamicModuleController);
//# sourceMappingURL=dynamic-module.controller.js.map