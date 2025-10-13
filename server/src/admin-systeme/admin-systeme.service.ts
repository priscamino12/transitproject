import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAdminSystemeDto } from './dto/create-admin-systeme.dto';
import { UpdateAdminSystemeDto } from './dto/update-admin-systeme.dto';
import { errorResponse, successResponse } from 'src/utils/response.utils';

@Injectable()
export class AdminSystemeService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminSystemeDto: CreateAdminSystemeDto) {
    try {
      const hashedPassword = await bcrypt.hash(createAdminSystemeDto.motDePasse, 10);
      const admin = await this.prisma.adminSysteme.create({
        data: {
          ...createAdminSystemeDto,
          motDePasse: hashedPassword,
        },
      });
      const { motDePasse, ...adminResponse } = admin; // Exclure motDePasse
      return successResponse('Admin système créé avec succès', adminResponse,201);

    } catch (error: any) {
      return errorResponse('Erreur lors de la création de l\'admin', error);
      
    }
  }

  async findAll() {
    try {
      const admins = await this.prisma.adminSysteme.findMany();
      const adminsResponse = admins.map(({ motDePasse, ...admin }) => admin); // Exclure motDePasse
      return successResponse('Admins récupérés avec succès', adminsResponse,200);
   
    } catch (error: any) {
      return errorResponse('Erreur lors de la récupération des admins', error);
     
    }
  }

  async findOne(id: number){
    try {
      const admin = await this.prisma.adminSysteme.findUnique({
        where: { idAdminSysteme: id },
      });
      if (!admin) {
        return successResponse('Admin non trouvé', null,404);
        
      }
      const { motDePasse, ...adminResponse } = admin; 
      return successResponse('Admin récupéré avec succès', adminResponse,201);
      
    } catch (error: any) {
      return errorResponse('Erreur lors de la récupération de l\'admin', error);
    }
  }

  async update(id: number, updateAdminSystemeDto: UpdateAdminSystemeDto){
    try {
      const admin = await this.prisma.adminSysteme.findUnique({
        where: { idAdminSysteme: id },
      });
      if (!admin) {
        return errorResponse('Admin non trouvé', null,404);
       
      }
      const data = { ...updateAdminSystemeDto };
      if (data.motDePasse) {
        data.motDePasse = await bcrypt.hash(data.motDePasse, 10);
      }
      const updatedAdmin = await this.prisma.adminSysteme.update({
        where: { idAdminSysteme: id },
        data,
      });
      const { motDePasse, ...adminResponse } = updatedAdmin; // Exclure motDePasse
      return successResponse('Admin mis à jour avec succès', adminResponse,200);
      
    } catch (error: any) {
      return errorResponse('Erreur lors de la mise à jour de l\'admin', error);
      
    }
  }

  async remove(id: number){
    try {
      const admin = await this.prisma.adminSysteme.findUnique({
        where: { idAdminSysteme: id },
      });
      if (!admin) {
        return errorResponse('Admin non trouvé', null,404);
        
      }
      await this.prisma.adminSysteme.delete({
        where: { idAdminSysteme: id },
      });
      return successResponse('Admin supprimé avec succès', null,200);
      
    } catch (error: any) {
      return errorResponse('Erreur lors de la suppression de l\'admin', error,401);
    }
  }
}
