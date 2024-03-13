"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCustomDecoratorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_custom_decorator_dto_1 = require("./create-custom-decorator.dto");
class UpdateCustomDecoratorDto extends (0, mapped_types_1.PartialType)(create_custom_decorator_dto_1.CreateCustomDecoratorDto) {
}
exports.UpdateCustomDecoratorDto = UpdateCustomDecoratorDto;
//# sourceMappingURL=update-custom-decorator.dto.js.map