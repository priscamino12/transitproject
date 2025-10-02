import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../types/api-response';
import { AdminSysteme } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateAdminSystemeDto } from './dto/create-admin-systeme.dto';
import { UpdateAdminSystemeDto } from './dto/update-admin-systeme.dto';

// Type personnalisé pour exclure motDePasse
type AdminSystemeResponse = Omit<AdminSysteme, 'motDePasse'>;

@Injectable()
export class AdminSystemeService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminSystemeDto: CreateAdminSystemeDto): Promise<ApiResponse<AdminSystemeResponse>> {
    try {
      const hashedPassword = await bcrypt.hash(createAdminSystemeDto.motDePasse, 10);
      const admin = await this.prisma.adminSysteme.create({
        data: {
          ...createAdminSystemeDto,
          motDePasse: hashedPassword,
        },
      });
      const { motDePasse, ...adminResponse } = admin; // Exclure motDePasse
      return {
        success: true,
        message: 'Admin système créé avec succès',
        data: adminResponse,
      };
    } catch (error: any) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) {
        throw error;
      }
      return {
        success: false,
        message: `Erreur lors de la création de l'admin: ${error.message}`,
        data: null,
      };
      
    }
  }

  async findAll(): Promise<ApiResponse<AdminSystemeResponse[]>> {
    try {
      const admins = await this.prisma.adminSysteme.findMany();
      const adminsResponse = admins.map(({ motDePasse, ...admin }) => admin); // Exclure motDePasse
      return {
        success: true,
        message: 'Admins récupérés avec succès',
        data: adminsResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la récupération des admins: ${error.message}`,
        data: null,
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<AdminSystemeResponse>> {
    try {
      const admin = await this.prisma.adminSysteme.findUnique({
        where: { idAdminSysteme: id },
      });
      if (!admin) {
        return {
          success: false,
          message: 'Admin non trouvé',
          data: null,
        };
      }
      const { motDePasse, ...adminResponse } = admin; // Exclure motDePasse
      return {
        success: true,
        message: 'Admin récupéré avec succès',
        data: adminResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la récupération de l'admin: ${error.message}`,
        data: null,
      };
    }
  }

  async update(id: number, updateAdminSystemeDto: UpdateAdminSystemeDto): Promise<ApiResponse<AdminSystemeResponse>> {
    try {
      const admin = await this.prisma.adminSysteme.findUnique({
        where: { idAdminSysteme: id },
      });
      if (!admin) {
        return {
          success: false,
          message: 'Admin non trouvé',
          data: null,
        };
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
      return {
        success: true,
        message: 'Admin mis à jour avec succès',
        data: adminResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la mise à jour de l'admin: ${error.message}`,
        data: null,
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    try {
      const admin = await this.prisma.adminSysteme.findUnique({
        where: { idAdminSysteme: id },
      });
      if (!admin) {
        return {
          success: false,
          message: 'Admin non trouvé',
          data: null,
        };
      }
      await this.prisma.adminSysteme.delete({
        where: { idAdminSysteme: id },
      });
      return {
        success: true,
        message: 'Admin supprimé avec succès',
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la suppression de l'admin: ${error.message}`,
        data: null,
      };
    }
  }
}
