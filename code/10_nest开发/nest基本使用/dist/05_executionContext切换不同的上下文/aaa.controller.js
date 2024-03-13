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
const MyException_1 = require("./MyException");
const bbb_filter_1 = require("./bbb.filter");
const execu_guard_1 = require("./execu.guard");
const roles_decorator_1 = require("./roles.decorator");
let AaaController = class AaaController {
    constructor() { }
    bbb() {
        throw new MyException_1.MyException('aaa', 'bbb');
    }
    ccc() {
        return '111';
    }
};
exports.AaaController = AaaController;
__decorate([
    (0, common_1.Get)('bbb'),
    (0, common_1.UseFilters)(bbb_filter_1.BbbFilter),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "bbb", null);
__decorate([
    (0, common_1.Get)('ccc'),
    (0, roles_decorator_1.Roles)('Admin'),
    (0, common_1.UseGuards)(execu_guard_1.ExecuGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "ccc", null);
exports.AaaController = AaaController = __decorate([
    (0, common_1.Controller)('aaa'),
    __metadata("design:paramtypes", [])
], AaaController);
//# sourceMappingURL=aaa.controller.js.map