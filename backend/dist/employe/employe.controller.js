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
exports.EmployeController = void 0;
const common_1 = require("@nestjs/common");
const employe_service_1 = require("./employe.service");
const create_employe_dto_1 = require("./dto/create-employe.dto");
const update_employe_dto_1 = require("./dto/update-employe.dto");
let EmployeController = class EmployeController {
    employeService;
    constructor(employeService) {
        this.employeService = employeService;
    }
    create(createEmployeDto) {
        return this.employeService.create(createEmployeDto);
    }
    findAll() {
        return this.employeService.findAll();
    }
    findOne(id) {
        return this.employeService.findOne(id);
    }
    update(id, updateEmployeDto) {
        return this.employeService.update(id, updateEmployeDto);
    }
    remove(id) {
        return this.employeService.remove(id);
    }
};
exports.EmployeController = EmployeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employe_dto_1.CreateEmployeDto]),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_employe_dto_1.UpdateEmployeDto]),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EmployeController.prototype, "remove", null);
exports.EmployeController = EmployeController = __decorate([
    (0, common_1.Controller)('employe'),
    __metadata("design:paramtypes", [employe_service_1.EmployeService])
], EmployeController);
