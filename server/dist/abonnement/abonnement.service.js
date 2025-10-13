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
exports.AbonnementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_utils_1 = require("../utils/response.utils");
let AbonnementService = class AbonnementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const { typeAccesId, dureeAbonnementId } = dto;
        const duree = await this.prisma.dureeAbonnement.findUnique({
            where: { id: dureeAbonnementId },
        });
        if (!duree) {
            return (0, response_utils_1.errorResponse)('Durée d’abonnement introuvable', null, 404);
        }
        const dateDebut = new Date();
        const dateFin = new Date();
        dateFin.setMonth(dateFin.getMonth() + duree.nbMois);
        try {
            const abonnement = await this.prisma.abonnement.create({
                data: {
                    typeAccesId,
                    dureeAbonnementId,
                    dateDebut,
                    dateFin,
                }, include: { typeAcces: true, paiements: true },
            });
            return (0, response_utils_1.successResponse)('Abonnement créé avec succès', abonnement);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)('Erreur lors de la création de l’abonnement', error.message);
        }
    }
    async findAll() {
        try {
            const abos = await this.prisma.abonnement.findMany({ include: { typeAcces: true, paiements: true } });
            return (0, response_utils_1.successResponse)('Liste des abonnements', abos);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async findOne(id) {
        try {
            const abo = await this.prisma.abonnement.findUnique({ where: { idAbonnement: id }, include: { typeAcces: true, paiements: true } });
            if (!abo)
                return (0, response_utils_1.errorResponse)('Abonnement non trouvé', null, 404);
            return (0, response_utils_1.successResponse)('Abonnement trouvé', abo);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async update(id, dto) {
        try {
            const abo = await this.prisma.abonnement.update({ where: { idAbonnement: id }, data: dto });
            return (0, response_utils_1.successResponse)('Abonnement mis à jour', abo);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async remove(id) {
        try {
            await this.prisma.abonnement.delete({ where: { idAbonnement: id } });
            return (0, response_utils_1.successResponse)('Abonnement supprimé', null);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
};
exports.AbonnementService = AbonnementService;
exports.AbonnementService = AbonnementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AbonnementService);
//# sourceMappingURL=abonnement.service.js.map