import { Injectable } from '@nestjs/common';
import { errorResponse, successResponse } from 'src/utils/response.utils';
import { UpdateDureeAbonnementDto } from './dto/update-duree-abonnement.dto';
import { CreateDureeAbonnementDto } from './dto/create-duree-abonnement.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DureeAbonnementService {
     constructor(private prisma: PrismaService) {}
    
      async create(dto: CreateDureeAbonnementDto) {
      try {
      const d_abo = await this.prisma.dureeAbonnement.create({ data: dto });
      return successResponse('DureeAbonnement créé', d_abo, 201);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
    }
    
      async findAll() {
        try {
          const d_abos = await this.prisma.dureeAbonnement.findMany({ include: { abonnements: true } });
          return successResponse('Liste des durées d\'abonnement', d_abos);
        } catch (error: any) {
          return errorResponse(error.message, null, 500);
        }
      }
    
      async findOne(id: number) {
        try {
          const d_abo = await this.prisma.dureeAbonnement.findUnique({ where: { id: id }, include: { abonnements: true } });
          if (!d_abo) return errorResponse('DureeAbonnement non trouvé', null, 404);
          return successResponse('DureeAbonnement trouvé', d_abo);
        } catch (error: any) {
          return errorResponse(error.message, null, 500);
        }
      }
    
      async update(id: number, dto: UpdateDureeAbonnementDto) {
        try {
          const abo = await this.prisma.dureeAbonnement.update({ where: { id: id }, data: dto });
          return successResponse('Duree Abonnement mis à jour', abo);
        } catch (error: any) {
          return errorResponse(error.message, null, 500);
        }
      }
    
      async remove(id: number) {
        try {
          await this.prisma.dureeAbonnement.delete({ where: { id: id } });
          return successResponse('Duree Abonnement supprimé', null);
        } catch (error: any) {
          return errorResponse(error.message, null, 500);
        }
      }
}
