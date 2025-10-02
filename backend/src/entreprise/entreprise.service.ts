import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../types/api-response';
import { Entreprise } from '@prisma/client';
import { CreateEntrepriseDto, UpdateEntrepriseDto } from './entreprise.dto';

@Injectable()
export class EntrepriseService {
  constructor(private prisma: PrismaService) {}

  async create(createEntrepriseDto: CreateEntrepriseDto): Promise<ApiResponse<Entreprise>> {
    try {
      // Vérifier si le type d'accès existe
      const typeAcces = await this.prisma.typeAcces.findUnique({
        where: { id: createEntrepriseDto.typeAccesId },
      });
      if (!typeAcces) {
        return {
          success: false,
          message: 'Type d\'accès non trouvé',
          data: null,
        };
      }

      const entreprise = await this.prisma.entreprise.create({
        data: createEntrepriseDto,
      });
      return {
        success: true,
        message: 'Entreprise créée avec succès',
        data: entreprise,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la création de l'entreprise: ${error.message}`,
        data: null,
      };
    }
  }

  async findAll(): Promise<ApiResponse<Entreprise[]>> {
    try {
      const entreprises = await this.prisma.entreprise.findMany();
      return {
        success: true,
        message: 'Entreprises récupérées avec succès',
        data: entreprises,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la récupération des entreprises: ${error.message}`,
        data: null,
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Entreprise>> {
    try {
      const entreprise = await this.prisma.entreprise.findUnique({
        where: { idEntreprise: id },
      });
      if (!entreprise) {
        return {
          success: false,
          message: 'Entreprise non trouvée',
          data: null,
        };
      }
      return {
        success: true,
        message: 'Entreprise récupérée avec succès',
        data: entreprise,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la récupération de l'entreprise: ${error.message}`,
        data: null,
      };
    }
  }

  async update(id: number, updateEntrepriseDto: UpdateEntrepriseDto): Promise<ApiResponse<Entreprise>> {
    try {
      const entreprise = await this.prisma.entreprise.findUnique({
        where: { idEntreprise: id },
      });
      if (!entreprise) {
        return {
          success: false,
          message: 'Entreprise non trouvée',
          data: null,
        };
      }
      if (updateEntrepriseDto.typeAccesId) {
        const typeAcces = await this.prisma.typeAcces.findUnique({
          where: { id: updateEntrepriseDto.typeAccesId },
        });
        if (!typeAcces) {
          return {
            success: false,
            message: 'Type d\'accès non trouvé',
            data: null,
          };
        }
      }
      const updatedEntreprise = await this.prisma.entreprise.update({
        where: { idEntreprise: id },
        data: updateEntrepriseDto,
      });
      return {
        success: true,
        message: 'Entreprise mise à jour avec succès',
        data: updatedEntreprise,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la mise à jour de l'entreprise: ${error.message}`,
        data: null,
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    try {
      const entreprise = await this.prisma.entreprise.findUnique({
        where: { idEntreprise: id },
      });
      if (!entreprise) {
        return {
          success: false,
          message: 'Entreprise non trouvée',
          data: null,
        };
      }
      await this.prisma.entreprise.delete({
        where: { idEntreprise: id },
      });
      return {
        success: true,
        message: 'Entreprise supprimée avec succès',
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la suppression de l'entreprise: ${error.message}`,
        data: null,
      };
    }
  }
}
