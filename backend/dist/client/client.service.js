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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let ClientService = class ClientService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createClientDto) {
        try {
            // Vérifier si l'entreprise existe
            const entreprise = await this.prisma.entreprise.findUnique({
                where: { idEntreprise: createClientDto.idEntreprise },
            });
            if (!entreprise) {
                return {
                    success: false,
                    message: 'Entreprise non trouvée',
                    data: null,
                };
            }
            const data = { ...createClientDto };
            if (data.motDePasse) {
                data.motDePasse = await bcrypt.hash(data.motDePasse, 10);
            }
            const client = await this.prisma.client.create({
                data,
            });
            const { motDePasse, ...clientResponse } = client;
            return {
                success: true,
                message: 'Client créé avec succès',
                data: clientResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la création du client: ${error.message}`,
                data: null,
            };
        }
    }
    async findAll() {
        try {
            const clients = await this.prisma.client.findMany();
            const clientsResponse = clients.map(({ motDePasse, ...client }) => client);
            return {
                success: true,
                message: 'Clients récupérés avec succès',
                data: clientsResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la récupération des clients: ${error.message}`,
                data: null,
            };
        }
    }
    async findOne(id) {
        try {
            const client = await this.prisma.client.findUnique({
                where: { idClient: id },
            });
            if (!client) {
                return {
                    success: false,
                    message: 'Client non trouvé',
                    data: null,
                };
            }
            const { motDePasse, ...clientResponse } = client;
            return {
                success: true,
                message: 'Client récupéré avec succès',
                data: clientResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la récupération du client: ${error.message}`,
                data: null,
            };
        }
    }
    async update(id, updateClientDto) {
        try {
            const client = await this.prisma.client.findUnique({
                where: { idClient: id },
            });
            if (!client) {
                return {
                    success: false,
                    message: 'Client non trouvé',
                    data: null,
                };
            }
            if (updateClientDto.idEntreprise) {
                const entreprise = await this.prisma.entreprise.findUnique({
                    where: { idEntreprise: updateClientDto.idEntreprise },
                });
                if (!entreprise) {
                    return {
                        success: false,
                        message: 'Entreprise non trouvée',
                        data: null,
                    };
                }
            }
            const data = { ...updateClientDto };
            if (data.motDePasse) {
                data.motDePasse = await bcrypt.hash(data.motDePasse, 10);
            }
            const updatedClient = await this.prisma.client.update({
                where: { idClient: id },
                data,
            });
            const { motDePasse, ...clientResponse } = updatedClient;
            return {
                success: true,
                message: 'Client mis à jour avec succès',
                data: clientResponse,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la mise à jour du client: ${error.message}`,
                data: null,
            };
        }
    }
    async remove(id) {
        try {
            const client = await this.prisma.client.findUnique({
                where: { idClient: id },
            });
            if (!client) {
                return {
                    success: false,
                    message: 'Client non trouvé',
                    data: null,
                };
            }
            await this.prisma.client.delete({
                where: { idClient: id },
            });
            return {
                success: true,
                message: 'Client supprimé avec succès',
                data: null,
            };
        }
        catch (error) {
            return {
                success: false,
                message: `Erreur lors de la suppression du client: ${error.message}`,
                data: null,
            };
        }
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientService);
