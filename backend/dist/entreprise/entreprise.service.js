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
let EntrepriseService = class EntrepriseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEntrepriseDto) {
        try {
            // Vérifier si le type d'accès existe
            const typeAcces = await this.prisma.typeAcces.findUnique({
                where: { id: createEntrepriseDto.typeAccesId },
            });
            if (!typeAcces) {
                return {
                    success: false,
                    message: 'Type d\'accès non trouvé',
                    data: null,
                };
            }
            const entreprise = await this.prisma.entreprise.create({
                data: createEntrepriseDto,
            });
            return {
                success: true,
                message: 'Entreprise créée avec succès',
                data: entreprise,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la création de l'entreprise: ${error.message}`,
                data: null,
            };
        }
    }
    async findAll() {
        try {
            const entreprises = await this.prisma.entreprise.findMany();
            return {
                success: true,
                message: 'Entreprises récupérées avec succès',
                data: entreprises,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la récupération des entreprises: ${error.message}`,
                data: null,
            };
        }
    }
    async findOne(id) {
        try {
            const entreprise = await this.prisma.entreprise.findUnique({
                where: { idEntreprise: id },
            });
            if (!entreprise) {
                return {
                    success: false,
                    message: 'Entreprise non trouvée',
                    data: null,
                };
            }
            return {
                success: true,
                message: 'Entreprise récupérée avec succès',
                data: entreprise,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la récupération de l'entreprise: ${error.message}`,
                data: null,
            };
        }
    }
    async update(id, updateEntrepriseDto) {
        try {
            const entreprise = await this.prisma.entreprise.findUnique({
                where: { idEntreprise: id },
            });
            if (!entreprise) {
                return {
                    success: false,
                    message: 'Entreprise non trouvée',
                    data: null,
                };
            }
            if (updateEntrepriseDto.typeAccesId) {
                const typeAcces = await this.prisma.typeAcces.findUnique({
                    where: { id: updateEntrepriseDto.typeAccesId },
                });
                if (!typeAcces) {
                    return {
                        success: false,
                        message: 'Type d\'accès non trouvé',
                        data: null,
                    };
                }
            }
            const updatedEntreprise = await this.prisma.entreprise.update({
                where: { idEntreprise: id },
                data: updateEntrepriseDto,
            });
            return {
                success: true,
                message: 'Entreprise mise à jour avec succès',
                data: updatedEntreprise,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la mise à jour de l'entreprise: ${error.message}`,
                data: null,
            };
        }
    }
    async remove(id) {
        try {
            const entreprise = await this.prisma.entreprise.findUnique({
                where: { idEntreprise: id },
            });
            if (!entreprise) {
                return {
                    success: false,
                    message: 'Entreprise non trouvée',
                    data: null,
                };
            }
            await this.prisma.entreprise.delete({
                where: { idEntreprise: id },
            });
            return {
                success: true,
                message: 'Entreprise supprimée avec succès',
                data: null,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la suppression de l'entreprise: ${error.message}`,
                data: null,
            };
        }
    }
};
exports.EntrepriseService = EntrepriseService;
exports.EntrepriseService = EntrepriseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EntrepriseService);
