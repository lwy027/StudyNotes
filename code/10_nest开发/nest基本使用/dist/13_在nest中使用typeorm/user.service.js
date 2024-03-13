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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const city_entity_1 = require("./entities/city.entity");
let UserService = class UserService {
    create(createUserDto) {
        console.log('---');
        return this.manager.save(user_entity_1.User, createUserDto);
    }
    findAll() {
        return this.userRepository.find();
    }
    findOne(id) {
        return this.userRepository.find({
            where: { id },
        });
    }
    update(id, updateUserDto) {
        return this.userRepository.save({
            id,
            ...updateUserDto,
        });
    }
    remove(id) {
        return this.userRepository.delete(id);
    }
    async getCity() {
        const parentCity = new city_entity_1.City();
        parentCity.name = '华南';
        await this.cityRepository.save(parentCity);
        const childCity1 = new city_entity_1.City();
        childCity1.name = '云南';
        const parent1 = await this.cityRepository.findOne({
            where: {
                name: '华南',
            },
        });
        if (parent1) {
            childCity1.parent = parent1;
        }
        await this.cityRepository.save(childCity1);
        const childCity2 = new city_entity_1.City();
        childCity2.name = '昆明';
        const parent2 = await this.cityRepository.findOne({
            where: {
                name: '昆明',
            },
        });
        if (parent2) {
            childCity2.parent = parent2;
        }
        await this.cityRepository.save(childCity2);
        return await this.manager.getTreeRepository(city_entity_1.City).countAncestors(parent1);
    }
};
exports.UserService = UserService;
__decorate([
    (0, typeorm_1.InjectEntityManager)(),
    __metadata("design:type", typeorm_2.EntityManager)
], UserService.prototype, "manager", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "userRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(city_entity_1.City),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "cityRepository", void 0);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map