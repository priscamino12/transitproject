import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTypeAccesDto } from './dto/create-type-acces.dto';
import { UpdateTypeAccesDto } from './dto/update-type-acces.dto';
import { successResponse, errorResponse } from '../utils/response.utils';

@Injectable()
export class TypeAccesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTypeAccesDto) {
    try {
      const type = await this.prisma.typeAcces.create({ data: dto });
      return successResponse('TypeAcces créé', type, 201);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async findAll() {
    try {
      const types = await this.prisma.typeAcces.findMany({ include: { abonnements: true, entreprises: true } });
      return successResponse('Liste des TypeAcces', types);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async findOne(id: number) {
    try {
      const type = await this.prisma.typeAcces.findUnique({ where: { id }, include: { abonnements: true, entreprises: true } });
      if (!type) return errorResponse('TypeAcces non trouvé', null, 404);
      return successResponse('TypeAcces trouvé', type);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async update(id: number, dto: UpdateTypeAccesDto) {
    try {
      const type = await this.prisma.typeAcces.update({ where: { id }, data: dto });
      return successResponse('TypeAcces mis à jour', type);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.typeAcces.delete({ where: { id } });
      return successResponse('TypeAcces supprimé', null);
    } catch (error: any) {
      return errorResponse(error.message, null, 500);
    }
  }
}