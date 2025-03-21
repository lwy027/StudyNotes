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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../redis/redis.service");
let SessionService = class SessionService {
    async getSession(sid) {
        return await this.redisService.hashGet(`sid_${sid}`);
    }
    async setSession(sid, value, ttl = 30 * 60) {
        if (!sid) {
            sid = this.generateSid();
        }
        await this.redisService.hashSet(`sid_${sid}`, value, ttl);
        return sid;
    }
    generateSid() {
        return Math.random().toString().slice(2, 12);
    }
};
exports.SessionService = SessionService;
__decorate([
    (0, common_1.Inject)(redis_service_1.redisService),
    __metadata("design:type", redis_service_1.redisService)
], SessionService.prototype, "redisService", void 0);
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)()
], SessionService);
//# sourceMappingURL=session.service.js.map