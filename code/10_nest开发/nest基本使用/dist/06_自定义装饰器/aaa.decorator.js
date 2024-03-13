"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyQuery = exports.Myheader = exports.ccc = exports.Bbb = exports.Aaa = void 0;
const common_1 = require("@nestjs/common");
const aaa_guard_1 = require("./aaa.guard");
const Aaa = (...args) => (0, common_1.SetMetadata)('aaa', args);
exports.Aaa = Aaa;
function Bbb(path, role) {
    return (0, common_1.applyDecorators)((0, common_1.Get)(path), (0, common_1.UseGuards)(aaa_guard_1.AaaGuard), (0, common_1.SetMetadata)('bbb', role));
}
exports.Bbb = Bbb;
exports.ccc = (0, common_1.createParamDecorator)((data, context) => {
    console.log(data);
    console.log(context);
    return 'ccc';
});
exports.Myheader = (0, common_1.createParamDecorator)((key, context) => {
    const request = context.switchToHttp().getRequest();
    return key ? request.headers[key.toLowerCase()] : request.headers;
});
exports.MyQuery = (0, common_1.createParamDecorator)((key, context) => {
    const request = context.switchToHttp().getRequest();
    return request.query[key];
});
//# sourceMappingURL=aaa.decorator.js.map