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
exports.AaaController = void 0;
const common_1 = require("@nestjs/common");
let AaaController = class AaaController {
    host(a) {
        console.log(a);
        return a;
    }
    ccc(req) {
        console.log(req.hostname);
        console.log(req.url);
        return req.hostname;
    }
    ddd(res) {
        console.log(res);
        return 'dd';
    }
    eee1(next) {
        console.log('handler1');
        next();
    }
    eee2() {
        console.log('handler2');
        return '111';
    }
    fff() {
        return 'hello';
    }
    ggg() {
        return '请求头修改成功';
    }
    hhh() { }
    jump() {
        return {
            statusCodee: 302,
            url: 'http://www.baidu.com',
        };
    }
};
exports.AaaController = AaaController;
__decorate([
    (0, common_1.Get)('bbb'),
    __param(0, (0, common_1.HostParam)('host')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "host", null);
__decorate([
    (0, common_1.Get)('ccc'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "ccc", null);
__decorate([
    (0, common_1.Get)('ddd'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "ddd", null);
__decorate([
    (0, common_1.Get)('eee'),
    __param(0, (0, common_1.Next)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "eee1", null);
__decorate([
    (0, common_1.Get)('eee'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "eee2", null);
__decorate([
    (0, common_1.Get)('fff'),
    (0, common_1.HttpCode)(222),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "fff", null);
__decorate([
    (0, common_1.Get)('ggg'),
    (0, common_1.Header)('aaa', 'bbb'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "ggg", null);
__decorate([
    (0, common_1.Get)('hhh'),
    (0, common_1.Redirect)('http://www.baidu.com'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "hhh", null);
__decorate([
    (0, common_1.Get)('iii'),
    (0, common_1.Redirect)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AaaController.prototype, "jump", null);
exports.AaaController = AaaController = __decorate([
    (0, common_1.Controller)({ host: ':host.0.0.1', path: 'aaa' })
], AaaController);
//# sourceMappingURL=aaa.controller.js.map