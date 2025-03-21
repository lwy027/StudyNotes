"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatePipe = void 0;
const common_1 = require("@nestjs/common");
let ValidatePipe = class ValidatePipe {
    transform(value, metadata) {
        console.log(value);
        console.log(metadata.data);
        if (Number.isNaN(parseInt(value))) {
            throw new common_1.BadRequestException(`参数${metadata.data}只能是字符串或者数字`);
        }
        return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
    }
};
exports.ValidatePipe = ValidatePipe;
exports.ValidatePipe = ValidatePipe = __decorate([
    (0, common_1.Injectable)()
], ValidatePipe);
//# sourceMappingURL=validate.pipe.js.map