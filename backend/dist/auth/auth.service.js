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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const response_utils_1 = require("../utils/response.utils");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        try {
            let user = await this.prisma.adminSysteme.findUnique({
                where: { emailAdminSysteme: loginDto.email },
            });
            if (!user) {
                user = await this.prisma.employe.findUnique({
                    where: { emailEmploye: loginDto.email },
                });
            }
            if (!user) {
                user = await this.prisma.client.findUnique({
                    where: { emailClient: loginDto.email },
                });
                if (user && !user.motDePasse) {
                    return (0, response_utils_1.errorResponse)('Aucun mot de passe défini pour cet utilisateur.', null, 401);
                }
            }
            if (!user) {
                return (0, response_utils_1.errorResponse)('Utilisateur non trouvé.', null, 401);
            }
            const isPasswordValid = await bcrypt.compare(loginDto.motDePasse, user.motDePasse);
            if (!isPasswordValid) {
                return (0, response_utils_1.errorResponse)('Mot de passe incorrect.', null, 401);
            }
            // Récupérer id, nom, email, rôle, type
            const role = 'role' in user ? user.role : 'SuperAdmin';
            const type = 'idAdminSysteme' in user ? 'adminsysteme' :
                'idEmploye' in user ? 'employe' : 'client';
            const id = 'idAdminSysteme' in user ? user.idAdminSysteme :
                'idEmploye' in user ? user.idEmploye :
                    user.idClient;
            const nom = 'nomAdminSysteme' in user ? user.nomAdminSysteme :
                'nomEmploye' in user ? user.nomEmploye :
                    user.nomClient;
            const email = 'emailAdminSysteme' in user ? user.emailAdminSysteme :
                'emailEmploye' in user ? user.emailEmploye :
                    user.emailClient;
            // Générer JWT (mais ne pas le renvoyer)
            const token = this.jwtService.sign({ sub: id, email, role, type });
            // Retourner seulement les infos utilisateur
            const userInfo = { id, nom, email, role, type };
            // On met le token dans le cookie HttpOnly via interceptor ou middleware
            return (0, response_utils_1.successResponse)('Connexion réussie', { userInfo, token });
            // Si tu utilises un interceptor pour le cookie, tu peux supprimer "token" ici
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(`Erreur lors de la connexion: ${error.message}`, null, 500);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
