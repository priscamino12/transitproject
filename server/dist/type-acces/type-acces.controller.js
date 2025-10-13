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
exports.TypeAccesController = void 0;
const common_1 = require("@nestjs/common");
const type_acces_service_1 = require("./type-acces.service");
const create_type_acces_dto_1 = require("./dto/create-type-acces.dto");
const update_type_acces_dto_1 = require("./dto/update-type-acces.dto");
let TypeAccesController = class TypeAccesController {
    typeAccesService;
    constructor(typeAccesService) {
        this.typeAccesService = typeAccesService;
    }
    create(dto) {
        return this.typeAccesService.create(dto);
    }
    findAll() {
        return this.typeAccesService.findAll();
    }
    findOne(id) {
        return this.typeAccesService.findOne(+id);
    }
    update(id, dto) {
        return this.typeAccesService.update(+id, dto);
    }
    remove(id) {
        return this.typeAccesService.remove(+id);
    }
};
exports.TypeAccesController = TypeAccesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_type_acces_dto_1.CreateTypeAccesDto]),
    __metadata("design:returntype", void 0)
], TypeAccesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TypeAccesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeAccesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_type_acces_dto_1.UpdateTypeAccesDto]),
    __metadata("design:returntype", void 0)
], TypeAccesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeAccesController.prototype, "remove", null);
exports.TypeAccesController = TypeAccesController = __decorate([
    (0, common_1.Controller)('type-acces'),
    __metadata("design:paramtypes", [type_acces_service_1.TypeAccesService])
], TypeAccesController);
//# sourceMappingURL=type-acces.controller.js.map