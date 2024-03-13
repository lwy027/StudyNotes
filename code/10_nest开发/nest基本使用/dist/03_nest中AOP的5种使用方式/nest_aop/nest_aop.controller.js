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
exports.NestAopController = void 0;
const common_1 = require("@nestjs/common");
const nest_aop_service_1 = require("./nest_aop.service");
const validate_pipe_1 = require("./validate.pipe");
const test_filter_1 = require("./test.filter");
let NestAopController = class NestAopController {
    constructor(nestAopService) {
        this.nestAopService = nestAopService;
    }
    findAll() {
        console.log('handle....');
        return this.nestAopService.findAll();
    }
    Hello() {
        return 'aaa';
    }
    bbb() {
        return 'bbb';
    }
    pipe(num) {
        return num + 1;
    }
};
exports.NestAopController = NestAopController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NestAopController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('aaa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NestAopController.prototype, "Hello", null);
__decorate([
    (0, common_1.Get)('bbb'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NestAopController.prototype, "bbb", null);
__decorate([
    (0, common_1.Get)('pipe'),
    (0, common_1.UseFilters)(test_filter_1.TestFilter),
    __param(0, (0, common_1.Query)('num', validate_pipe_1.ValidatePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NestAopController.prototype, "pipe", null);
exports.NestAopController = NestAopController = __decorate([
    (0, common_1.Controller)('nest_aop'),
    __metadata("design:paramtypes", [nest_aop_service_1.NestAopService])
], NestAopController);
//# sourceMappingURL=nest_aop.controller.js.map