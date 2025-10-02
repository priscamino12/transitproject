import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../types/api-response';
import { Abonnement } from '@prisma/client';
import { CreateAbonnementDto, UpdateAbonnementDto } from './abonnement.dto';

@Injectable()
export class AbonnementService {
  constructor(private prisma: PrismaService) {}

  // async create(createAbonnementDto: CreateAbonnementDto): Promise<ApiResponse<Abonnement>> {
  //   try {
  //     // Vérifier si l'entreprise existe
  //     const entreprise = await this.prisma.entreprise.findUnique({
  //       where: { idEntreprise: createAbonnementDto.idEntreprise },
  //     });
  //     if (!entreprise) {
  //       throw new NotFoundException({
  //         success: false,
  //         message: 'Entreprise non trouvée',
  //         data: null,
  //       });
  //     }

  //     // Vérifier si le type d'accès existe
  //     const typeAcces = await this.prisma.typeAcces.findUnique({
  //       where: { id: createAbonnementDto.typeAccesId },
  //     });
  //     if (!typeAcces) {
  //       throw new NotFoundException({
  //         success: false,
  //         message: 'Type d\'accès non trouvé',
  //         data: null,
  //       });
  //     }

  //     const abonnement = await this.prisma.abonnement.create({
  //       data: createAbonnementDto,
  //     });
  //     return {
  //       success: true,
  //       message: 'Abonnement créé avec succès',
  //       data: abonnement,
  //     };
  //   } catch (error: any) {
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     return {
  //       success: false,
  //       message: `Erreur lors de la création de l'abonnement: ${error.message}`,
  //       data: null,
  //     };
  //   }
  // }

  async findAll(): Promise<ApiResponse<Abonnement[]>> {
    try {
      const abonnements = await this.prisma.abonnement.findMany();
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

  async findOne(id: number): Promise<ApiResponse<Abonnement>> {
    try {
      const abonnement = await this.prisma.abonnement.findUnique({
        where: { idAbonnement: id }, 
      });
      if (!abonnement) {
        throw new NotFoundException({
          success: false,
          message: 'Abonnement non trouvé',
          data: null,
        });
      }
      return {
        success: true,
        message: 'Abonnement récupéré avec succès',
        data: abonnement,
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return {
        success: false,
        message: `Erreur lors de la récupération de l'abonnement: ${error.message}`,
        data: null,
      };
    }
  }

  async update(id: number, updateAbonnementDto: UpdateAbonnementDto): Promise<ApiResponse<Abonnement>> {
    try {
      const abonnement = await this.prisma.abonnement.findUnique({
        where: { idAbonnement: id },
      });
      if (!abonnement) {
        throw new NotFoundException({
          success: false,
          message: 'Abonnement non trouvé',
          data: null,
        });
      }
      if (updateAbonnementDto.idEntreprise) {
        const entreprise = await this.prisma.entreprise.findUnique({
          where: { idEntreprise: updateAbonnementDto.idEntreprise },
        });
        if (!entreprise) {
          throw new NotFoundException({
            success: false,
            message: 'Entreprise non trouvée',
            data: null,
          });
        }
      }
      if (updateAbonnementDto.typeAccesId) {
        const typeAcces = await this.prisma.typeAcces.findUnique({
          where: { id: updateAbonnementDto.typeAccesId },
        });
        if (!typeAcces) {
          throw new NotFoundException({
            success: false,
            message: 'Type d\'accès non trouvé',
            data: null,
          });
        }
      }
      const updatedAbonnement = await this.prisma.abonnement.update({
        where: { idAbonnement: id },
        data: updateAbonnementDto,
      });
      return {
        success: true,
        message: 'Abonnement mis à jour avec succès',
        data: updatedAbonnement,
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return {
        success: false,
        message: `Erreur lors de la mise à jour de l'abonnement: ${error.message}`,
        data: null,
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    try {
      const abonnement = await this.prisma.abonnement.findUnique({
        where: { idAbonnement: id },
      });
      if (!abonnement) {
        throw new NotFoundException({
          success: false,
          message: 'Abonnement non trouvé',
          data: null,
        });
      }
      await this.prisma.abonnement.delete({
        where: { idAbonnement: id },
      });
      return {
        success: true,
        message: 'Abonnement supprimé avec succès',
        data: null,
      };
    } catch (error: any) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return {
        success: false,
        message: `Erreur lors de la suppression de l'abonnement: ${error.message}`,
        data: null,
      };
    }
  }
}
