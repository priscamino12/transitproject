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
exports.AdminSystemeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let AdminSystemeService = class AdminSystemeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAdminSystemeDto) {
        try {
            const hashedPassword = await bcrypt.hash(createAdminSystemeDto.motDePasse, 10);
            const admin = await this.prisma.adminSysteme.create({
                data: {
                    ...createAdminSystemeDto,
                    motDePasse: hashedPassword,
                },
            });
            const { motDePasse, ...adminResponse } = admin; // Exclure motDePasse
            return {
                success: true,
                message: 'Admin système créé avec succès',
                data: adminResponse,
            };
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException || error instanceof common_1.NotFoundException) {
                throw error;
            }
            return {
                success: false,
                message: `Erreur lors de la création de l'admin: ${error.message}`,
                data: null,
            };
        }
    }
    async findAll() {
        try {
            const admins = await this.prisma.adminSysteme.findMany();
            const adminsResponse = admins.map(({ motDePasse, ...admin }) => admin); // Exclure motDePasse
            return {
                success: true,
                message: 'Admins récupérés avec succès',
                data: adminsResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la récupération des admins: ${error.message}`,
                data: null,
            };
        }
    }
    async findOne(id) {
        try {
            const admin = await this.prisma.adminSysteme.findUnique({
                where: { idAdminSysteme: id },
            });
            if (!admin) {
                return {
                    success: false,
                    message: 'Admin non trouvé',
                    data: null,
                };
            }
            const { motDePasse, ...adminResponse } = admin; // Exclure motDePasse
            return {
                success: true,
                message: 'Admin récupéré avec succès',
                data: adminResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la récupération de l'admin: ${error.message}`,
                data: null,
            };
        }
    }
    async update(id, updateAdminSystemeDto) {
        try {
            const admin = await this.prisma.adminSysteme.findUnique({
                where: { idAdminSysteme: id },
            });
            if (!admin) {
                return {
                    success: false,
                    message: 'Admin non trouvé',
                    data: null,
                };
            }
            const data = { ...updateAdminSystemeDto };
            if (data.motDePasse) {
                data.motDePasse = await bcrypt.hash(data.motDePasse, 10);
            }
            const updatedAdmin = await this.prisma.adminSysteme.update({
                where: { idAdminSysteme: id },
                data,
            });
            const { motDePasse, ...adminResponse } = updatedAdmin; // Exclure motDePasse
            return {
                success: true,
                message: 'Admin mis à jour avec succès',
                data: adminResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la mise à jour de l'admin: ${error.message}`,
                data: null,
            };
        }
    }
    async remove(id) {
        try {
            const admin = await this.prisma.adminSysteme.findUnique({
                where: { idAdminSysteme: id },
            });
            if (!admin) {
                return {
                    success: false,
                    message: 'Admin non trouvé',
                    data: null,
                };
            }
            await this.prisma.adminSysteme.delete({
                where: { idAdminSysteme: id },
            });
            return {
                success: true,
                message: 'Admin supprimé avec succès',
                data: null,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la suppression de l'admin: ${error.message}`,
                data: null,
            };
        }
    }
};
exports.AdminSystemeService = AdminSystemeService;
exports.AdminSystemeService = AdminSystemeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminSystemeService);
