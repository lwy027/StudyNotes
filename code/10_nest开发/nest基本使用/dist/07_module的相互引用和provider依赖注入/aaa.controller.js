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
const aaa_service_1 = require("./aaa.service");
const bbb_service_1 = require("./bbb.service");
let AaaController = class AaaController {
    constructor(aaaService, bbbService) {
        this.aaaService = aaaService;
        this.bbbService = bbbService;
    }
    aaa() {
        return this.aaaService.aaa() + this.bbbService.bbb();
    }
};
exports.AaaController = AaaController;
__decorate([
    (0, common_1.Get)('aaa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "aaa", null);
exports.AaaController = AaaController = __decorate([
    (0, common_1.Controller)('aaa'),
    __metadata("design:paramtypes", [aaa_service_1.AaaService,
        bbb_service_1.BbbService])
], AaaController);
//# sourceMappingURL=aaa.controller.js.map