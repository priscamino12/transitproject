// src/abonnement/abonnement.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAbonnementDto } from './dto/create-abonnement.dto';
import { successResponse, errorResponse } from '../utils/response.utils';
import { UpdateAbonnementDto } from './dto/updtate.abonnement.dto';

@Injectable()
export class AbonnementService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAbonnementDto) {
  try {
    const abonnement = await this.prisma.abonnement.create({
      data: {
        typeAccesId: data.typeAccesId,
        dateDebut: new Date(data.dateDebut),
        dateFin: new Date(data.dateFin),
        reductionPourcentage: data.reductionPourcentage ?? 0,
      },
    });
    return successResponse('Abonnement créé avec succès', abonnement);
  } catch (error: any) {
    return errorResponse('Erreur lors de la création de l’abonnement', error.message);
  }
}

  async findAll() {
    try {
      const abos = await this.prisma.abonnement.findMany({ include: { typeAcces: true, paiements: true } });
      return successResponse('Liste des abonnements', abos);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async findOne(id: number) {
    try {
      const abo = await this.prisma.abonnement.findUnique({ where: { idAbonnement: id }, include: { typeAcces: true, paiements: true } });
      if (!abo) return errorResponse('Abonnement non trouvé', null, 404);
      return successResponse('Abonnement trouvé', abo);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async update(id: number, dto: UpdateAbonnementDto) {
    try {
      const abo = await this.prisma.abonnement.update({ where: { idAbonnement: id }, data: dto });
      return successResponse('Abonnement mis à jour', abo);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.abonnement.delete({ where: { idAbonnement: id } });
      return successResponse('Abonnement supprimé', null);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }
}
