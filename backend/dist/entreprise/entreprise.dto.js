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
exports.UpdateEntrepriseDto = exports.CreateEntrepriseDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class CreateEntrepriseDto {
    nomEntreprise;
    logoEntreprise;
    adresseEntreprise;
    nif;
    statJuridique;
    typeAccesId;
    statusAbonnement;
    dateDebutAbonnement;
    dateFinAbonnement;
}
exports.CreateEntrepriseDto = CreateEntrepriseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEntrepriseDto.prototype, "nomEntreprise", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEntrepriseDto.prototype, "logoEntreprise", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEntrepriseDto.prototype, "adresseEntreprise", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEntrepriseDto.prototype, "nif", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEntrepriseDto.prototype, "statJuridique", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateEntrepriseDto.prototype, "typeAccesId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.StatusAbonnement),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEntrepriseDto.prototype, "statusAbonnement", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEntrepriseDto.prototype, "dateDebutAbonnement", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateEntrepriseDto.prototype, "dateFinAbonnement", void 0);
class UpdateEntrepriseDto {
    nomEntreprise;
    logoEntreprise;
    adresseEntreprise;
    nif;
    statJuridique;
    typeAccesId;
    statusAbonnement;
    dateDebutAbonnement;
    dateFinAbonnement;
}
exports.UpdateEntrepriseDto = UpdateEntrepriseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEntrepriseDto.prototype, "nomEntreprise", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEntrepriseDto.prototype, "logoEntreprise", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEntrepriseDto.prototype, "adresseEntreprise", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEntrepriseDto.prototype, "nif", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEntrepriseDto.prototype, "statJuridique", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateEntrepriseDto.prototype, "typeAccesId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.StatusAbonnement),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEntrepriseDto.prototype, "statusAbonnement", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEntrepriseDto.prototype, "dateDebutAbonnement", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateEntrepriseDto.prototype, "dateFinAbonnement", void 0);
