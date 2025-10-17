import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { errorResponse, successResponse } from 'src/utils/response.utils';


@Injectable()
export class EmployeService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeDto: CreateEmployeDto) {
    try {
      // Vérifier si l'entreprise existe
      const entreprise = await this.prisma.entreprise.findUnique({
        where: { idEntreprise: createEmployeDto.idEntreprise },
      });
      if (!entreprise) {
        return errorResponse('Entreprise non trouvée', null, 404 );
      }

      const hashedPassword = await bcrypt.hash(createEmployeDto.motDePasse, 10);
      const employe = await this.prisma.employe.create({
        data: {
          ...createEmployeDto,
          motDePasse: hashedPassword,
        },
      });
      const { motDePasse, ...employeResponse } = employe; // Exclure motDePasse
      return successResponse('Employé créé avec succès', employeResponse, 201);
      
    } catch (error: any) {
      return errorResponse(`Erreur lors de la création de l'employé: ${error.message}`, null, 500);
    }
  }

async findAll(){
  try {
    const employes = await this.prisma.employe.findMany({
      include: { entreprise: true }  // <-- Ajouté ici
    });
    const employesResponse = employes.map(({ motDePasse, ...employe }) => employe);
    return {
      success: true,
      message: 'Employés récupérés avec succès',
      data: employesResponse,
    };
  } catch (error: any) {
    return {
      success: false,
      message: `Erreur lors de la récupération des employés: ${error.message}`,
      data: null,
    };
  }
}

// employe.service.ts
async findAllByEntreprise(idEntreprise: number) {
  const employes = await this.prisma.employe.findMany({
    where: { idEntreprise },
    select: {
      idEmploye: true,
      nomEmploye: true,
      emailEmploye: true,
      role: true,
      entreprise: {
        select: {
          nomEntreprise: true
        }
      }
    }
  });
  return employes;
}


  async findOne(id: number) {
    try {
      const employe = await this.prisma.employe.findUnique({
        where: { idEmploye: id },
      });
      if (!employe) {
        return {
          success: false,
          message: 'Employé non trouvé',
          data: null,
        };
      }
      const { motDePasse, ...employeResponse } = employe; // Exclure motDePasse
      return {
        success: true,
        message: 'Employé récupéré avec succès',
        data: employeResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la récupération de l'employé: ${error.message}`,
        data: null,
      };
    }
  }

  async update(id: number, updateEmployeDto: UpdateEmployeDto) {
    try {
      const employe = await this.prisma.employe.findUnique({
        where: { idEmploye: id },
      });
      if (!employe) {
        return {
          success: false,
          message: 'Employé non trouvé',
          data: null,
        };
      }
      if (updateEmployeDto.idEntreprise) {
        const entreprise = await this.prisma.entreprise.findUnique({
          where: { idEntreprise: updateEmployeDto.idEntreprise },
        });
        if (!entreprise) {
          return {
            success: false,
            message: 'Entreprise non trouvée',
            data: null,
          };
        }
      }
      const data = { ...updateEmployeDto };
      if (data.motDePasse) {
        data.motDePasse = await bcrypt.hash(data.motDePasse, 10);
      }
      const updatedEmploye = await this.prisma.employe.update({
        where: { idEmploye: id },
        data,
      });
      const { motDePasse, ...employeResponse } = updatedEmploye; // Exclure motDePasse
      return {
        success: true,
        message: 'Employé mis à jour avec succès',
        data: employeResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la mise à jour de l'employé: ${error.message}`,
        data: null,
      };
    }
  }

  async remove(id: number) {
    try {
      const employe = await this.prisma.employe.findUnique({
        where: { idEmploye: id },
      });
      if (!employe) {
        return {
          success: false,
          message: 'Employé non trouvé',
          data: null,
        };
      }
      await this.prisma.employe.delete({
        where: { idEmploye: id },
      });
      return {
        success: true,
        message: 'Employé supprimé avec succès',
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la suppression de l'employé: ${error.message}`,
        data: null,
      };
    }
  }
}