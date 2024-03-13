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
var FileSliceController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSliceController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const MyLogger_1 = require("./MyLogger");
const multer = require('multer');
let FileSliceController = FileSliceController_1 = class FileSliceController {
    constructor() {
        this.logger = new common_1.Logger();
    }
    uploadFiles(files, body) {
        console.log('files', files);
        console.log('body', body);
        return '文件上传成功';
    }
    print() {
        this.logger.debug('这是一个显而易见的错误', FileSliceController_1.name);
        this.logger.error('error', FileSliceController_1.name);
        this.logger.fatal('fatal', FileSliceController_1.name);
        this.logger.log('fatal', FileSliceController_1.name);
        this.logger.warn('warn', FileSliceController_1.name);
        this.logger.verbose('verbose', FileSliceController_1.name);
        console.log('------');
        this.mylogger.log('自定义日志', FileSliceController_1.name);
    }
};
exports.FileSliceController = FileSliceController;
FileSliceController.ll = 'lwy';
__decorate([
    (0, common_1.Post)('aaa'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('avator', 3, {
        dest: 'uploads',
        storage: multer.diskStorage({
            destination(req, file, callback) {
                callback(null, 'uploads');
            },
            filename(req, file, cb) {
                cb(null, Date.now() + '-' + file.originalname);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", void 0)
], FileSliceController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Inject)(MyLogger_1.MyLogger),
    __metadata("design:type", MyLogger_1.MyLogger)
], FileSliceController.prototype, "mylogger", void 0);
__decorate([
    (0, common_1.Get)('print'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FileSliceController.prototype, "print", null);
exports.FileSliceController = FileSliceController = FileSliceController_1 = __decorate([
    (0, common_1.Controller)('file-slice')
], FileSliceController);
//# sourceMappingURL=file-slice.controller.js.map