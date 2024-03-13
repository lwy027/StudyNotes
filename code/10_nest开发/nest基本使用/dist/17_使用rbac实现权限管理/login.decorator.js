"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequirePermission = exports.requireLogin = void 0;
const common_1 = require("@nestjs/common");
const requireLogin = () => (0, common_1.SetMetadata)('require_login', true);
exports.requireLogin = requireLogin;
const RequirePermission = (...permissions) => (0, common_1.SetMetadata)('require-permission', permissions);
exports.RequirePermission = RequirePermission;
//# sourceMappingURL=login.decorator.js.map