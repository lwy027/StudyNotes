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
exports.AaaController = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AaaController = class AaaController {
    aa() {
        console.log('---');
        return {
            aaa: this.configService.get('aaa'),
            bbb: this.configService.get('bbb'),
        };
    }
    bb() {
        return {
            db: this.configService.get('db'),
        };
    }
};
exports.AaaController = AaaController;
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], AaaController.prototype, "configService", void 0);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "aa", null);
__decorate([
    (0, common_1.Get)('db'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "bb", null);
exports.AaaController = AaaController = __decorate([
    (0, common_1.Controller)('aaa')
], AaaController);
//# sourceMappingURL=aaa.controller.js.map