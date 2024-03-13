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
exports.PipeAllController = void 0;
const common_1 = require("@nestjs/common");
const valid_pipe_1 = require("./valid.pipe");
const Person_1 = require("./dto/Person");
const my_validation_pipe_pipe_1 = require("./my-validation-pipe.pipe");
let PipeAllController = class PipeAllController {
    constructor() { }
    dd(age) {
        return age;
    }
    bb(bb) {
        return bb;
    }
    getHello(age) {
        return age + 1;
    }
    cc(kk) {
        return kk;
    }
    login(person) {
        console.log(person);
        return person;
    }
};
exports.PipeAllController = PipeAllController;
__decorate([
    (0, common_1.Get)('dd'),
    __param(0, (0, common_1.Query)('age', valid_pipe_1.ValidPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PipeAllController.prototype, "dd", null);
__decorate([
    (0, common_1.Get)(':bb'),
    __param(0, (0, common_1.Param)('bb')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PipeAllController.prototype, "bb", null);
__decorate([
    (0, common_1.Get)('int'),
    __param(0, (0, common_1.Query)('age', new common_1.ParseIntPipe({
        exceptionFactory(msg) {
            console.log(msg);
            throw new common_1.HttpException('参数类型错误' + msg, common_1.HttpStatus.ACCEPTED);
        },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PipeAllController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('cc'),
    __param(0, (0, common_1.Query)('cc', new common_1.DefaultValuePipe('nnnn'))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PipeAllController.prototype, "cc", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)(new my_validation_pipe_pipe_1.MyValidationPipePipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Person_1.Person]),
    __metadata("design:returntype", void 0)
], PipeAllController.prototype, "login", null);
exports.PipeAllController = PipeAllController = __decorate([
    (0, common_1.Controller)('pipe-all'),
    __metadata("design:paramtypes", [])
], PipeAllController);
//# sourceMappingURL=pipe_all.controller.js.map