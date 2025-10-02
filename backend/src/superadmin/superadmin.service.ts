import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../types/api-response';
import { AdminSysteme } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
import { LoginSuperAdminDto } from './dto/login-super-admin.dto';

@Injectable()
export class AdminSystemeService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async create(createAdminDto: CreateSuperAdminDto): Promise<ApiResponse<AdminSysteme>> {
    try {
      // Vérifier si l'email existe déjà
      const existingAdmin = await this.prisma.adminSysteme.findUnique({
        where: { emailAdmin: createAdminDto.emailAdmin },
      });
      if (existingAdmin) {
        throw new BadRequestException({
          success: false,
          message: "Cet email est déjà utilisé par un autre admin.",
          data: null,
        });
      }

      // Crypter le mot de passe
      const hashedPassword = await bcrypt.hash(createAdminDto.motDePasse, 10);

      const admin = await this.prisma.adminSysteme.create({
        data: {
          nomAdmin: createAdminDto.nomAdmin,
          emailAdmin: createAdminDto.emailAdmin,
          motDePasse: hashedPassword,
        },
      });

      return {
        success: true,
        message: 'Admin système créé avec succès',
        data: admin,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la création de l'admin système: ${error.message}`,
        data: null,
      };
    }
  }

  async findAll(): Promise<ApiResponse<AdminSysteme[]>> {
    try {
      const admins = await this.prisma.adminSysteme.findMany();
      return {
        success: true,
        message: 'Admins système récupérés avec succès',
        data: admins,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la récupération des admins système: ${error.message}`,
        data: null,
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<AdminSysteme>> {
    try {
      const admin = await this.prisma.adminSysteme.findUnique({
        where: { idAdmin: id },
      });
      if (!admin) {
        throw new NotFoundException(`Admin système avec l'ID ${id} n'existe pas.`);
      }
      return {
        success: true,
        message: 'Admin système récupéré avec succès',
        data: admin,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la récupération de l'admin système: ${error.message}`,
        data: null,
      };
    }
  }

  async update(id: number, updateAdminDto: UpdateSuperAdminDto): Promise<ApiResponse<AdminSysteme>> {
    try {
      const admin = await this.prisma.adminSysteme.findUnique({
        where: { idAdmin: id },
      });
      if (!admin) {
        throw new NotFoundException(`Admin système avec l'ID ${id} n'existe pas.`);
      }

      let hashedPassword: string | undefined;
      if (updateAdminDto.motDePasse) {
        hashedPassword = await bcrypt.hash(updateAdminDto.motDePasse, 10);
      }

      const updatedAdmin = await this.prisma.adminSysteme.update({
        where: { idAdmin: id },
        data: {
          nomAdmin: updateAdminDto.nomAdmin,
          emailAdmin: updateAdminDto.emailAdmin,
          motDePasse: hashedPassword,
        },
      });

      return {
        success: true,
        message: 'Admin système mis à jour avec succès',
        data: updatedAdmin,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la mise à jour de l'admin système: ${error.message}`,
        data: null,
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    try {
      const admin = await this.prisma.adminSysteme.findUnique({
        where: { idAdmin: id },
      });
      if (!admin) {
        throw new NotFoundException(`Admin système avec l'ID ${id} n'existe pas.`);
      }

      await this.prisma.adminSysteme.delete({
        where: { idAdmin: id },
      });

      return {
        success: true,
        message: 'Admin système supprimé avec succès',
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la suppression de l'admin système: ${error.message}`,
        data: null,
      };
    }
  }

  async login(loginAdminDto: LoginSuperAdminDto): Promise<ApiResponse<{ admin: any; token: string }>> {
    try {
      const admin = await this.prisma.adminSysteme.findUnique({
        where: { emailAdmin: loginAdminDto.emailAdmin },
      });

      if (!admin) {
        throw new UnauthorizedException({
          success: false,
          message: 'Admin système non trouvé.',
          data: null,
        });
      }

      const isPasswordValid = await bcrypt.compare(loginAdminDto.motDePasse, admin.motDePasse);
      if (!isPasswordValid) {
        throw new UnauthorizedException({
          success: false,
          message: 'Mot de passe incorrect.',
          data: null,
        });
      }

      const payload = { sub: admin.idAdmin, email: admin.emailAdmin, role: 'ADMIN_SYSTEME' };
      const token = this.jwtService.sign(payload);

      const adminData = {
        id: admin.idAdmin,
        nom: admin.nomAdmin,
        email: admin.emailAdmin,
      };

      return {
        success: true,
        message: 'Authentification réussie',
        data: { admin: adminData, token },
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de l'authentification: ${error.message}`,
        data: null,
      };
    }
  }
}