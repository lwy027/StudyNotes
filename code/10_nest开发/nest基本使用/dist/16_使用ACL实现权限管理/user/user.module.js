"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const permision_entity_1 = require("./entities/permision.entity");
const permission_guard_1 = require("../permission.guard");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Liweiye123456',
                database: 'acl_test',
                synchronize: true,
                logging: true,
                entities: [user_entity_1.User, permision_entity_1.Permission],
                poolSize: 10,
                connectorPackage: 'mysql2',
                extra: {
                    authPlugin: 'sha256_password',
                },
            }),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, permission_guard_1.PermissionGuard],
        exports: [user_service_1.UserService, permission_guard_1.PermissionGuard],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map