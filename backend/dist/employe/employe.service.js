"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let EmployeService = class EmployeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createEmployeDto) {
        try {
            // Vérifier si l'entreprise existe
            const entreprise = await this.prisma.entreprise.findUnique({
                where: { idEntreprise: createEmployeDto.idEntreprise },
            });
            if (!entreprise) {
                return {
                    success: false,
                    message: 'Entreprise non trouvée',
                    data: null,
                };
            }
            const hashedPassword = await bcrypt.hash(createEmployeDto.motDePasse, 10);
            const employe = await this.prisma.employe.create({
                data: {
                    ...createEmployeDto,
                    motDePasse: hashedPassword,
                },
            });
            const { motDePasse, ...employeResponse } = employe; // Exclure motDePasse
            return {
                success: true,
                message: 'Employé créé avec succès',
                data: employeResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la création de l'employé: ${error.message}`,
                data: null,
            };
        }
    }
    async findAll() {
        try {
            const employes = await this.prisma.employe.findMany();
            const employesResponse = employes.map(({ motDePasse, ...employe }) => employe); // Exclure motDePasse
            return {
                success: true,
                message: 'Employés récupérés avec succès',
                data: employesResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la récupération des employés: ${error.message}`,
                data: null,
            };
        }
    }
    async findOne(id) {
        try {
            const employe = await this.prisma.employe.findUnique({
                where: { idEmploye: id },
            });
            if (!employe) {
                return {
                    success: false,
                    message: 'Employé non trouvé',
                    data: null,
                };
            }
            const { motDePasse, ...employeResponse } = employe; // Exclure motDePasse
            return {
                success: true,
                message: 'Employé récupéré avec succès',
                data: employeResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la récupération de l'employé: ${error.message}`,
                data: null,
            };
        }
    }
    async update(id, updateEmployeDto) {
        try {
            const employe = await this.prisma.employe.findUnique({
                where: { idEmploye: id },
            });
            if (!employe) {
                return {
                    success: false,
                    message: 'Employé non trouvé',
                    data: null,
                };
            }
            if (updateEmployeDto.idEntreprise) {
                const entreprise = await this.prisma.entreprise.findUnique({
                    where: { idEntreprise: updateEmployeDto.idEntreprise },
                });
                if (!entreprise) {
                    return {
                        success: false,
                        message: 'Entreprise non trouvée',
                        data: null,
                    };
                }
            }
            const data = { ...updateEmployeDto };
            if (data.motDePasse) {
                data.motDePasse = await bcrypt.hash(data.motDePasse, 10);
            }
            const updatedEmploye = await this.prisma.employe.update({
                where: { idEmploye: id },
                data,
            });
            const { motDePasse, ...employeResponse } = updatedEmploye; // Exclure motDePasse
            return {
                success: true,
                message: 'Employé mis à jour avec succès',
                data: employeResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la mise à jour de l'employé: ${error.message}`,
                data: null,
            };
        }
    }
    async remove(id) {
        try {
            const employe = await this.prisma.employe.findUnique({
                where: { idEmploye: id },
            });
            if (!employe) {
                return {
                    success: false,
                    message: 'Employé non trouvé',
                    data: null,
                };
            }
            await this.prisma.employe.delete({
                where: { idEmploye: id },
            });
            return {
                success: true,
                message: 'Employé supprimé avec succès',
                data: null,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la suppression de l'employé: ${error.message}`,
                data: null,
            };
        }
    }
};
exports.EmployeService = EmployeService;
exports.EmployeService = EmployeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmployeService);
