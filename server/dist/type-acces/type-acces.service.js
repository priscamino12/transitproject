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
exports.TypeAccesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const response_utils_1 = require("../utils/response.utils");
let TypeAccesService = class TypeAccesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        try {
            const type = await this.prisma.typeAcces.create({ data: dto });
            return (0, response_utils_1.successResponse)('TypeAcces créé', type, 201);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async findAll() {
        try {
            const types = await this.prisma.typeAcces.findMany({ include: { abonnements: true, entreprises: true } });
            return (0, response_utils_1.successResponse)('Liste des TypeAcces', types);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async findOne(id) {
        try {
            const type = await this.prisma.typeAcces.findUnique({ where: { id }, include: { abonnements: true, entreprises: true } });
            if (!type)
                return (0, response_utils_1.errorResponse)('TypeAcces non trouvé', null, 404);
            return (0, response_utils_1.successResponse)('TypeAcces trouvé', type);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async update(id, dto) {
        try {
            const type = await this.prisma.typeAcces.update({ where: { id }, data: dto });
            return (0, response_utils_1.successResponse)('TypeAcces mis à jour', type);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
    async remove(id) {
        try {
            await this.prisma.typeAcces.delete({ where: { id } });
            return (0, response_utils_1.successResponse)('TypeAcces supprimé', null);
        }
        catch (error) {
            return (0, response_utils_1.errorResponse)(error.message, null, 500);
        }
    }
};
exports.TypeAccesService = TypeAccesService;
exports.TypeAccesService = TypeAccesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TypeAccesService);
//# sourceMappingURL=type-acces.service.js.map