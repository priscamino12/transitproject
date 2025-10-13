// src/abonnement/abonnement.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAbonnementDto } from './dto/create-abonnement.dto';
import { successResponse, errorResponse } from '../utils/response.utils';
import { UpdateAbonnementDto } from './dto/updtate.abonnement.dto';

@Injectable()
export class AbonnementService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateAbonnementDto) {
    const { typeAccesId, dureeAbonnementId } = dto;

    // 🔹 Récupération de la durée en mois depuis la table duree_abonnement
    const duree = await this.prisma.dureeAbonnement.findUnique({
      where: { id: dureeAbonnementId },
    });

    if (!duree) {
      return errorResponse('Durée d’abonnement introuvable', null, 404);
    }
    const dateDebut = new Date();
    const dateFin = new Date();
    dateFin.setMonth(dateFin.getMonth() + duree.nbMois);

    // 🔹 Création de l’abonnement


    try {
      const abonnement = await this.prisma.abonnement.create({
        data: {
          typeAccesId,
          dureeAbonnementId,
          dateDebut,
          dateFin,
        }, include: { typeAcces: true, paiements: true },
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
