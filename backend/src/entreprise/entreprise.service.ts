import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
import { successResponse, errorResponse } from '@/utils/response.utils';

@Injectable()
export class EntrepriseService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEntrepriseDto) {
    try {
      const entreprise = await this.prisma.entreprise.create({
        data: {
          ...dto,
          statusAbonnement: 'ACTIF',
          dateDebutAbonnement: new Date(),
        },
      });
      return successResponse('Entreprise créée avec succès', entreprise, 201);
    } catch (error: any) {
      return errorResponse(`Erreur lors de la création: ${error.message}`, null, 500);
    }
  }

  async findAll() {
    try {
      const entreprises = await this.prisma.entreprise.findMany({
        include: { typeAcces: true, paiements: true },
      });
      return successResponse('Liste des entreprises récupérée', entreprises);
    } catch (error: any) {
      return errorResponse(`Erreur lors de la récupération: ${error.message}`, null, 500);
    }
  }

  async findOne(id: number) {
    try {
      const entreprise = await this.prisma.entreprise.findUnique({
        where: { idEntreprise: id },
        include: { typeAcces: true, paiements: true },
      });

      if (!entreprise) {
        return errorResponse('Entreprise non trouvée', null, 404);
      }

      return successResponse('Entreprise trouvée', entreprise);
    } catch (error: any) {
      return errorResponse(`Erreur lors de la récupération: ${error.message}`, null, 500);
    }
  }

  async update(id: number, dto: UpdateEntrepriseDto) {
    try {
      const entreprise = await this.prisma.entreprise.update({
        where: { idEntreprise: id },
        data: { ...dto },
      });
      return successResponse('Entreprise mise à jour avec succès', entreprise);
    } catch (error: any) {
      return errorResponse(`Erreur lors de la mise à jour: ${error.message}`, null, 500);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.entreprise.delete({
        where: { idEntreprise: id },
      });
      return successResponse('Entreprise supprimée avec succès', null);
    } catch (error: any) {
      return errorResponse(`Erreur lors de la suppression: ${error.message}`, null, 500);
    }
  }
}