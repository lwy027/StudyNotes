"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BbbFilter = void 0;
const common_1 = require("@nestjs/common");
const MyException_1 = require("./MyException");
let BbbFilter = class BbbFilter {
    catch(exception, host) {
        console.log(exception);
        if (host.getType() == 'http') {
            const ctx = host.switchToHttp();
            const request = ctx.getRequest();
            const response = ctx.getRequest();
            console.log(request);
            response.status(400).json({});
        }
        else if (host.getType() === 'ws') {
        }
        else if (host.getType() === 'rpc') {
        }
        debugger;
    }
};
exports.BbbFilter = BbbFilter;
exports.BbbFilter = BbbFilter = __decorate([
    (0, common_1.Catch)(MyException_1.MyException)
], BbbFilter);
//# sourceMappingURL=bbb.filter.js.map