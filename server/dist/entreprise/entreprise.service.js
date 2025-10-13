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
exports.EntrepriseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_utils_1 = require("../utils/response.utils");
let EntrepriseService = class EntrepriseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            const entreprise = await this.prisma.entreprise.create({
                data: {
                    ...dto,
                    statusAbonnement: 'ACTIF',
                    dateDebutAbonnement: new Date(),
                },
            });
            return (0, response_utils_1.successResponse)('Entreprise créée avec succès', entreprise, 201);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(`Erreur lors de la création: ${error.message}`, null, 500);
        }
    }
    async findAll() {
        try {
            const entreprises = await this.prisma.entreprise.findMany({
                include: { typeAcces: true, paiements: true },
            });
            return (0, response_utils_1.successResponse)('Liste des entreprises récupérée', entreprises);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(`Erreur lors de la récupération: ${error.message}`, null, 500);
        }
    }
    async findOne(id) {
        try {
            const entreprise = await this.prisma.entreprise.findUnique({
                where: { idEntreprise: id },
                include: { typeAcces: true, paiements: true },
            });
            if (!entreprise) {
                return (0, response_utils_1.errorResponse)('Entreprise non trouvée', null, 404);
            }
            return (0, response_utils_1.successResponse)('Entreprise trouvée', entreprise);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(`Erreur lors de la récupération: ${error.message}`, null, 500);
        }
    }
    async update(id, dto) {
        try {
            const entreprise = await this.prisma.entreprise.update({
                where: { idEntreprise: id },
                data: { ...dto },
            });
            return (0, response_utils_1.successResponse)('Entreprise mise à jour avec succès', entreprise);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(`Erreur lors de la mise à jour: ${error.message}`, null, 500);
        }
    }
    async remove(id) {
        try {
            await this.prisma.entreprise.delete({
                where: { idEntreprise: id },
            });
            return (0, response_utils_1.successResponse)('Entreprise supprimée avec succès', null);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(`Erreur lors de la suppression: ${error.message}`, null, 500);
        }
    }
};
exports.EntrepriseService = EntrepriseService;
exports.EntrepriseService = EntrepriseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EntrepriseService);
//# sourceMappingURL=entreprise.service.js.map