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
exports.sessionController = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("./session.service");
let sessionController = class sessionController {
    async count(req, res) {
        const sid = req.cookies?.sid;
        const session = await this.sessionService.getSession(sid);
        const curCount = session.count ? parseInt(session.count) + 1 : 1;
        const curSid = await this.sessionService.setSession(sid, {
            count: curCount,
        });
        res.cookie('sid', curSid, { maxAge: 1800000 });
        this.sessionService.setSession(sid, session.count);
    }
};
exports.sessionController = sessionController;
__decorate([
    (0, common_1.Inject)(session_service_1.SessionService),
    __metadata("design:type", session_service_1.SessionService)
], sessionController.prototype, "sessionService", void 0);
__decorate([
    (0, common_1.Get)('count'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], sessionController.prototype, "count", null);
exports.sessionController = sessionController = __decorate([
    (0, common_1.Controller)('session')
], sessionController);
//# sourceMappingURL=session.controlller.js.map