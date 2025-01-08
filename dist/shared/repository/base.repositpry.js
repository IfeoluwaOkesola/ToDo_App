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
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let BaseRepository = class BaseRepository {
    constructor(entity) {
        this.entity = entity;
    }
    async create(createdEntityData) {
        const createdEntity = this.entity.create(createdEntityData);
        return await this.entity.save(createdEntity);
    }
    async findOne(filterData, relations) {
        return await this.entity.findOne({
            where: filterData,
            relations: relations,
        });
    }
    async findOneAndUpdate(filterData, updateData) {
        const existingEntity = await this.findOne(filterData);
        if (!existingEntity) {
            throw new common_1.NotFoundException(`Data for ${filterData} not found`);
        }
        await this.entity.update(filterData, updateData);
        return this.entity.findOne({ where: filterData });
    }
    async delete(filterData) {
        const result = await this.entity.delete(filterData);
        return result.affected > 0;
    }
    async findAll() {
        return await this.entity.find();
    }
    async find(filterData) {
        return this.entity.find(filterData);
    }
    async createQueryBuilder(alias) {
        return this.entity.createQueryBuilder(alias);
    }
};
exports.BaseRepository = BaseRepository;
exports.BaseRepository = BaseRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BaseRepository);
//# sourceMappingURL=base.repositpry.js.map