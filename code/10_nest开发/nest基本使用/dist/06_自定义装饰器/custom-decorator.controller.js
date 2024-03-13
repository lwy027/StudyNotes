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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomDecoratorController = void 0;
const common_1 = require("@nestjs/common");
const aaa_decorator_1 = require("./aaa.decorator");
const aaa_guard_1 = require("./aaa.guard");
let CustomDecoratorController = class CustomDecoratorController {
    aa() {
        return 'aa';
    }
    bb() {
        return 'bb';
    }
    cc(cc) {
        return cc;
    }
    dd(header1, header2) {
        console.log(header1);
        console.log(header2);
        return 'ddd';
    }
    ee(www, age) {
        console.log(www);
        console.log(age);
        return 'eeee';
    }
};
exports.CustomDecoratorController = CustomDecoratorController;
__decorate([
    (0, common_1.Get)('aa'),
    (0, aaa_decorator_1.Aaa)('admin'),
    (0, common_1.UseGuards)(aaa_guard_1.AaaGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomDecoratorController.prototype, "aa", null);
__decorate([
    (0, aaa_decorator_1.Bbb)('bb', 'user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomDecoratorController.prototype, "bb", null);
__decorate([
    (0, common_1.Get)('cc'),
    __param(0, (0, aaa_decorator_1.ccc)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomDecoratorController.prototype, "cc", null);
__decorate([
    (0, common_1.Get)('dd'),
    __param(0, (0, common_1.Headers)('accept')),
    __param(1, (0, aaa_decorator_1.Myheader)('accept')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], CustomDecoratorController.prototype, "dd", null);
__decorate([
    (0, common_1.Get)('ee'),
    __param(0, (0, aaa_decorator_1.MyQuery)('name')),
    __param(1, (0, common_1.Query)('age')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], CustomDecoratorController.prototype, "ee", null);
exports.CustomDecoratorController = CustomDecoratorController = __decorate([
    (0, common_1.Controller)('custom-decorator')
], CustomDecoratorController);
//# sourceMappingURL=custom-decorator.controller.js.map