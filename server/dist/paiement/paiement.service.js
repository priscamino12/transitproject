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
exports.PaiementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_utils_1 = require("../utils/response.utils");
let PaiementService = class PaiementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const { abonnementId, entrepriseId, modePaiementId, montant } = dto;
        const abonnement = await this.prisma.abonnement.findUnique({
            where: { idAbonnement: abonnementId },
            include: {
                dureeAbonnement: true,
                typeAcces: true,
            },
        });
        if (!abonnement) {
            return (0, response_utils_1.errorResponse)('Abonnement introuvable', null, 404);
        }
        const prixBase = abonnement.typeAcces.prixBase;
        const reduction = abonnement.dureeAbonnement.reduction;
        const prixFinal = prixBase - (prixBase * reduction);
        if (montant !== prixFinal) {
            return (0, response_utils_1.errorResponse)(`Montant incorrect. Le montant attendu est ${prixFinal}.`, null, 400);
        }
        try {
            const paiement = await this.prisma.paiement.create({
                data: {
                    abonnementId,
                    entrepriseId,
                    modePaiementId,
                    montant,
                    datePaiement: new Date(),
                }, include: { entreprise: true, abonnement: true, modePaiement: true },
            });
            return (0, response_utils_1.successResponse)('Paiement enregistré', paiement, 201);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async findAll() {
        try {
            const paiements = await this.prisma.paiement.findMany({
                include: { entreprise: true, abonnement: true, modePaiement: true },
            });
            return (0, response_utils_1.successResponse)('Liste des paiements', paiements);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async findOne(id) {
        try {
            const paiement = await this.prisma.paiement.findUnique({
                where: { id },
                include: { entreprise: true, abonnement: true, modePaiement: true },
            });
            if (!paiement)
                return (0, response_utils_1.errorResponse)('Paiement non trouvé', null, 404);
            return (0, response_utils_1.successResponse)('Paiement trouvé', paiement);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async update(id, dto) {
        try {
            const paiement = await this.prisma.paiement.update({ where: { id }, data: dto });
            return (0, response_utils_1.successResponse)('Paiement mis à jour', paiement);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async remove(id) {
        try {
            await this.prisma.paiement.delete({ where: { id } });
            return (0, response_utils_1.successResponse)('Paiement supprimé', null);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
};
exports.PaiementService = PaiementService;
exports.PaiementService = PaiementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaiementService);
//# sourceMappingURL=paiement.service.js.map