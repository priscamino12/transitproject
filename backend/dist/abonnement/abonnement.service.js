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
let AbonnementService = class AbonnementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // async create(createAbonnementDto: CreateAbonnementDto): Promise<ApiResponse<Abonnement>> {
    //   try {
    //     // Vérifier si l'entreprise existe
    //     const entreprise = await this.prisma.entreprise.findUnique({
    //       where: { idEntreprise: createAbonnementDto.idEntreprise },
    //     });
    //     if (!entreprise) {
    //       throw new NotFoundException({
    //         success: false,
    //         message: 'Entreprise non trouvée',
    //         data: null,
    //       });
    //     }
    //     // Vérifier si le type d'accès existe
    //     const typeAcces = await this.prisma.typeAcces.findUnique({
    //       where: { id: createAbonnementDto.typeAccesId },
    //     });
    //     if (!typeAcces) {
    //       throw new NotFoundException({
    //         success: false,
    //         message: 'Type d\'accès non trouvé',
    //         data: null,
    //       });
    //     }
    //     const abonnement = await this.prisma.abonnement.create({
    //       data: createAbonnementDto,
    //     });
    //     return {
    //       success: true,
    //       message: 'Abonnement créé avec succès',
    //       data: abonnement,
    //     };
    //   } catch (error: any) {
    //     if (error instanceof NotFoundException) {
    //       throw error;
    //     }
    //     return {
    //       success: false,
    //       message: `Erreur lors de la création de l'abonnement: ${error.message}`,
    //       data: null,
    //     };
    //   }
    // }
    async findAll() {
        try {
            const abonnements = await this.prisma.abonnement.findMany();
            return {
                success: true,
                message: 'Abonnements récupérés avec succès',
                data: abonnements,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la récupération des abonnements: ${error.message}`,
                data: null,
            };
        }
    }
    async findOne(id) {
        try {
            const abonnement = await this.prisma.abonnement.findUnique({
                where: { idAbonnement: id },
            });
            if (!abonnement) {
                throw new common_1.NotFoundException({
                    success: false,
                    message: 'Abonnement non trouvé',
                    data: null,
                });
            }
            return {
                success: true,
                message: 'Abonnement récupéré avec succès',
                data: abonnement,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Erreur lors de la récupération de l'abonnement: ${error.message}`,
                data: null,
            };
        }
    }
    async update(id, updateAbonnementDto) {
        try {
            const abonnement = await this.prisma.abonnement.findUnique({
                where: { idAbonnement: id },
            });
            if (!abonnement) {
                throw new common_1.NotFoundException({
                    success: false,
                    message: 'Abonnement non trouvé',
                    data: null,
                });
            }
            if (updateAbonnementDto.idEntreprise) {
                const entreprise = await this.prisma.entreprise.findUnique({
                    where: { idEntreprise: updateAbonnementDto.idEntreprise },
                });
                if (!entreprise) {
                    throw new common_1.NotFoundException({
                        success: false,
                        message: 'Entreprise non trouvée',
                        data: null,
                    });
                }
            }
            if (updateAbonnementDto.typeAccesId) {
                const typeAcces = await this.prisma.typeAcces.findUnique({
                    where: { id: updateAbonnementDto.typeAccesId },
                });
                if (!typeAcces) {
                    throw new common_1.NotFoundException({
                        success: false,
                        message: 'Type d\'accès non trouvé',
                        data: null,
                    });
                }
            }
            const updatedAbonnement = await this.prisma.abonnement.update({
                where: { idAbonnement: id },
                data: updateAbonnementDto,
            });
            return {
                success: true,
                message: 'Abonnement mis à jour avec succès',
                data: updatedAbonnement,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Erreur lors de la mise à jour de l'abonnement: ${error.message}`,
                data: null,
            };
        }
    }
    async remove(id) {
        try {
            const abonnement = await this.prisma.abonnement.findUnique({
                where: { idAbonnement: id },
            });
            if (!abonnement) {
                throw new common_1.NotFoundException({
                    success: false,
                    message: 'Abonnement non trouvé',
                    data: null,
                });
            }
            await this.prisma.abonnement.delete({
                where: { idAbonnement: id },
            });
            return {
                success: true,
                message: 'Abonnement supprimé avec succès',
                data: null,
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Erreur lors de la suppression de l'abonnement: ${error.message}`,
                data: null,
            };
        }
    }
};
exports.AbonnementService = AbonnementService;
exports.AbonnementService = AbonnementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AbonnementService);
