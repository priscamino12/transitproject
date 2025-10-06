// src/paiement/paiement.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { successResponse, errorResponse } from '@/utils/response.utils';

@Injectable()
export class PaiementService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePaiementDto) {
    try {
      const paiement = await this.prisma.paiement.create({ data: dto });
      return successResponse('Paiement enregistré', paiement, 201);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async findAll() {
    try {
      const paiements = await this.prisma.paiement.findMany({
        include: { entreprise: true, abonnement: true, modePaiement: true },
      });
      return successResponse('Liste des paiements', paiements);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async findOne(id: number) {
    try {
      const paiement = await this.prisma.paiement.findUnique({
        where: { id },
        include: { entreprise: true, abonnement: true, modePaiement: true },
      });
      if (!paiement) return errorResponse('Paiement non trouvé', null, 404);
      return successResponse('Paiement trouvé', paiement);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async update(id: number, dto: UpdatePaiementDto) {
    try {
      const paiement = await this.prisma.paiement.update({ where: { id }, data: dto });
      return successResponse('Paiement mis à jour', paiement);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.paiement.delete({ where: { id } });
      return successResponse('Paiement supprimé', null);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }
}