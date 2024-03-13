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
exports.PersonController = void 0;
const common_1 = require("@nestjs/common");
const person_service_1 = require("./person.service");
const create_person_dto_1 = require("./dto/create-person.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require('multer');
let PersonController = class PersonController {
    constructor(personService) {
        this.personService = personService;
    }
    getQuery(name, age) {
        return `获取uery数据成功姓名${name}-年龄${age}`;
    }
    getParams(id) {
        return `获取params数据成功${id}`;
    }
    getUrlEncode(createPersonDot) {
        return `获取urlEncode数据成功姓名${createPersonDot.name}-年龄${createPersonDot.age}`;
    }
    getformData(createPersonDot, files) {
        console.log(files);
        return `上传文件成功姓名${createPersonDot.name}-年龄${createPersonDot.age}`;
    }
    getJson(createPersonDot) {
        return `获取urlEncode数据成功姓名${createPersonDot.name}-年龄${createPersonDot.age}`;
    }
};
exports.PersonController = PersonController;
__decorate([
    (0, common_1.Get)('query'),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('age')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "getQuery", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "getParams", null);
__decorate([
    (0, common_1.Post)('urlencode'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_dto_1.CreatePersonDto]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "getUrlEncode", null);
__decorate([
    (0, common_1.Post)('file'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        dest: 'uploads/',
        storage: multer.diskStorage({
            destination(req, file, callback) {
                callback(null, 'uploads/');
            },
            filename(req, file, cb) {
                console.log(file);
                cb(null, Date.now() + '-' + file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_dto_1.CreatePersonDto,
        Array]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "getformData", null);
__decorate([
    (0, common_1.Post)('json'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_dto_1.CreatePersonDto]),
    __metadata("design:returntype", void 0)
], PersonController.prototype, "getJson", null);
exports.PersonController = PersonController = __decorate([
    (0, common_1.Controller)('person'),
    __metadata("design:paramtypes", [person_service_1.PersonService])
], PersonController);
//# sourceMappingURL=person.controller.js.map