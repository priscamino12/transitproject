import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModePaiementDto } from './dto/create-mode-paiement.dto';
import { UpdateModePaiementDto } from './dto/update-mode-paiement.dto';
import { successResponse, errorResponse } from '../utils/response.utils';

@Injectable()
export class ModePaiementService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateModePaiementDto) {
    try {
      const mode = await this.prisma.modePaiement.create({ data: dto });
      return successResponse('ModePaiement créé', mode, 201);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async findAll() {
    try {
      const modes = await this.prisma.modePaiement.findMany({ include: { paiements: true } });
      return successResponse('Liste des modes de paiement', modes);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async findOne(id: number) {
    try {
      const mode = await this.prisma.modePaiement.findUnique({ where: { id }, include: { paiements: true } });
      if (!mode) return errorResponse('ModePaiement non trouvé', null, 404);
      return successResponse('ModePaiement trouvé', mode);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async update(id: number, dto: UpdateModePaiementDto) {
    try {
      const mode = await this.prisma.modePaiement.update({ where: { id }, data: dto });
      return successResponse('ModePaiement mis à jour', mode);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.modePaiement.delete({ where: { id } });
      return successResponse('ModePaiement supprimé', null);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }
}