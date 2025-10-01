import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../types/api-response';
import { Abonnement, Paiement } from '@prisma/client';

export interface CreateAbonnementDto {
  typeAccesId: number;
  duree: 'MENSUEL' | 'TRIMESTRIEL' | 'ANNUEL';
  reductionPourcentage: number;
}

export interface CreatePaiementDto {
  abonnementId: number;
  entrepriseId: number;
  montant: number;
  modePaiementId: number;
}

@Injectable()
export class AbonnementService {
  constructor(private prisma: PrismaService) {}

  async createAbonnement(dto: CreateAbonnementDto): Promise<ApiResponse<Abonnement>> {
    try {
      const typeAcces = await this.prisma.typeAcces.findUnique({
        where: { id: dto.typeAccesId },
      });
      if (!typeAcces) {
        throw new NotFoundException(`Type d'accès avec l'ID ${dto.typeAccesId} n'existe pas.`);
      }

      const abonnement = await this.prisma.abonnement.create({
        data: {
          typeAccesId: dto.typeAccesId,
          duree: dto.duree,
          reductionPourcentage: dto.reductionPourcentage,
        },
      });

      return {
        success: true,
        message: 'Abonnement créé avec succès',
        data: abonnement,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la création de l'abonnement: ${error.message}`,
        data: null,
      };
    }
  }

  async createPaiement(dto: CreatePaiementDto): Promise<ApiResponse<Paiement>> {
    try {
      const abonnement = await this.prisma.abonnement.findUnique({
        where: { id: dto.abonnementId },
      });
      if (!abonnement) {
        throw new NotFoundException(`Abonnement avec l'ID ${dto.abonnementId} n'existe pas.`);
      }

      const entreprise = await this.prisma.entreprise.findUnique({
        where: { idEntreprise: dto.entrepriseId },
      });
      if (!entreprise) {
        throw new NotFoundException(`Entreprise avec l'ID ${dto.entrepriseId} n'existe pas.`);
      }

      const modePaiement = await this.prisma.modePaiement.findUnique({
        where: { id: dto.modePaiementId },
      });
      if (!modePaiement) {
        throw new NotFoundException(`Mode de paiement avec l'ID ${dto.modePaiementId} n'existe pas.`);
      }
      if (!modePaiement.actif) {
        throw new BadRequestException(`Le mode de paiement avec l'ID ${dto.modePaiementId} n'est pas actif.`);
      }

      const paiement = await this.prisma.paiement.create({
        data: {
          abonnementId: dto.abonnementId,
          entrepriseId: dto.entrepriseId,
          modePaiementId: dto.modePaiementId,
          montant: dto.montant,
        },
      });

      // Mettre à jour l'entreprise avec les informations d'abonnement
      const dateDebutAbonnement = new Date();
      let dateFinAbonnement: Date;
      switch (abonnement.duree) {
        case 'MENSUEL':
          dateFinAbonnement = new Date(dateDebutAbonnement.setMonth(dateDebutAbonnement.getMonth() + 1));
          break;
        case 'TRIMESTRIEL':
          dateFinAbonnement = new Date(dateDebutAbonnement.setMonth(dateDebutAbonnement.getMonth() + 3));
          break;
        case 'ANNUEL':
          dateFinAbonnement = new Date(dateDebutAbonnement.setFullYear(dateDebutAbonnement.getFullYear() + 1));
          break;
        default:
          throw new BadRequestException("Durée d'abonnement invalide.");
      }

      await this.prisma.entreprise.update({
        where: { idEntreprise: dto.entrepriseId },
        data: {
          typeAccesId: abonnement.typeAccesId,
          statusAbonnement: 'ACTIF',
          dateDebutAbonnement,
          dateFinAbonnement,
          montantAbonnement: dto.montant,
        },
      });

      return {
        success: true,
        message: 'Paiement enregistré avec succès',
        data: paiement,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de l'enregistrement du paiement: ${error.message}`,
        data: null,
      };
    }
  }

  async getAbonnementsByEntreprise(idEntreprise: number): Promise<ApiResponse<Abonnement[]>> {
    try {
      const abonnements = await this.prisma.abonnement.findMany({
        where: {
          paiements: {
            some: { entrepriseId: idEntreprise },
          },
        },
        include: { typeAcces: true },
      });
      return {
        success: true,
        message: 'Abonnements récupérés avec succès',
        data: abonnements,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la récupération des abonnements: ${error.message}`,
        data: null,
      };
    }
  }
}
