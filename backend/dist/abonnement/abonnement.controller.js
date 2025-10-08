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
exports.AbonnementController = void 0;
const common_1 = require("@nestjs/common");
const abonnement_service_1 = require("./abonnement.service");
const abonnement_dto_1 = require("./abonnement.dto");
let AbonnementController = class AbonnementController {
    abonnementService;
    constructor(abonnementService) {
        this.abonnementService = abonnementService;
    }
    //   @Post()
    //   create(@Body() createAbonnementDto: CreateAbonnementDto): Promise<ApiResponse<Abonnement>> {
    //     return this.abonnementService.create(createAbonnementDto);
    //   }
    findAll() {
        return this.abonnementService.findAll();
    }
    findOne(id) {
        return this.abonnementService.findOne(id);
    }
    update(id, updateAbonnementDto) {
        return this.abonnementService.update(id, updateAbonnementDto);
    }
    remove(id) {
        return this.abonnementService.remove(id);
    }
};
exports.AbonnementController = AbonnementController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AbonnementController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AbonnementController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, abonnement_dto_1.UpdateAbonnementDto]),
    __metadata("design:returntype", Promise)
], AbonnementController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AbonnementController.prototype, "remove", null);
exports.AbonnementController = AbonnementController = __decorate([
    (0, common_1.Controller)('abonnement'),
    __metadata("design:paramtypes", [abonnement_service_1.AbonnementService])
], AbonnementController);
