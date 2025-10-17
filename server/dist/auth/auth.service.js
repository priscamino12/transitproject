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
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(loginDto, res) {
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
                    return (0, response_utils_1.errorResponse)('Aucun mot de passe défini.', null, 401);
                }
            }
            if (!user) {
                return (0, response_utils_1.errorResponse)('Utilisateur non trouvé.', null, 401);
            }
            const isPasswordValid = await bcrypt.compare(loginDto.password, user.motDePasse);
            if (!isPasswordValid) {
                return (0, response_utils_1.errorResponse)('Mot de passe incorrect.', null, 401);
            }
            const role = 'role' in user ? user.role : 'SuperAdmin';
            const type = 'idAdminSysteme' in user ? 'adminsysteme' :
                'idEmploye' in user ? 'employe' : 'client';
            const id = 'idAdminSysteme' in user ? user.idAdminSysteme :
                'idEmploye' in user ? user.idEmploye : user.idClient;
            const nom = 'nomAdminSysteme' in user ? user.nomAdminSysteme :
                'nomEmploye' in user ? user.nomEmploye : user.nomClient;
            const email = 'emailAdminSysteme' in user ? user.emailAdminSysteme :
                'emailEmploye' in user ? user.emailEmploye : user.emailClient;
            const token = this.jwtService.sign({ sub: id, email, role, type });
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: this.configService.get('NODE_ENV') === 'production',
                maxAge: 60 * 60 * 1000 * 24 * 90,
            });
            const userInfo = { userInfo: { id, nom, email, role, type } };
            if (type === 'employe') {
                const entrepriseInfo = await this.prisma.employe.findUnique({
                    where: { idEmploye: id },
                    select: {
                        entreprise: {
                            select: {
                                idEntreprise: true,
                                nomEntreprise: true,
                            },
                        },
                    },
                });
                userInfo['entreprise'] = entrepriseInfo?.entreprise || null;
            }
            return (0, response_utils_1.successResponse)('Connexion réussie', userInfo);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(`Erreur lors de la connexion: ${error.message}`, null, 500);
        }
    }
    async logout(res) {
        try {
            res.clearCookie('access_token', {
                httpOnly: true,
                secure: this.configService.get('NODE_ENV') === 'production',
                sameSite: 'lax',
            });
            return (0, response_utils_1.successResponse)('Déconnexion réussie.', null, 200);
        }
        catch (err) {
            return (0, response_utils_1.errorResponse)('Erreur serveur lors de la déconnexion.');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map