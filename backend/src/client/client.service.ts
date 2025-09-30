import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../types/api-response';
import { Client } from '@prisma/client';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) { }

  async create(createClientDto: CreateClientDto): Promise<ApiResponse<Client>> {
    try {
      // Vérifier si l'employé existe
      const employeExists = await this.prisma.employe.findUnique({
        where: { idEmploye: createClientDto.creerPar },
      });
      if (!employeExists) {
        return {
          success: false,
          message: `L'employé avec l'ID ${createClientDto.creerPar} n'existe pas.`,
          data: null,
        };
      }

      const client = await this.prisma.client.create({
        data: {
          nomClient: createClientDto.nomClient,
          emailClient: createClientDto.emailClient,
          telClient: createClientDto.telClient,
          adresseClient: createClientDto.adresseClient,
          CINClient: createClientDto.CINClient,
          creerPar: createClientDto.creerPar,
        },
      });
      return {
        success: true,
        message: 'Client créé avec succès',
        data: client,
      };
    } catch (error: any) {
      console.error('Erreur lors de la création du client:', error); // Log pour débogage
      // if (error.code === 'P2002') {
      //   const target = error.meta?.target || [];
      //   return {
      //     success: false,
      //     message: `Un client avec cet ${target.join(' ou ')} existe déjà. Veuillez utiliser des valeurs uniques pour Email, CIN ou Telephone.`,
      //     data: null,
      //   };
      // }
      if (error.code === 'P2002') {
        const target = error.meta?.target as string[];
        if (target.includes('emailClient')) {
          throw new BadRequestException({
            success: false,
            message: "Cet email est déjà utilisé par un autre client.",
            data: null,
          });
        }
        if (target.includes('telClient')) {
          throw new BadRequestException({
            success: false,
            message: "Ce numéro de téléphone est déjà utilisé par un autre client.",
            data: null,
          });
        }
        if (target.includes('CINClient')) {
          throw new BadRequestException({
            success: false,
            message: "Ce numéro CIN est déjà utilisé par un autre client.",
            data: null,
          });
        }
        throw new BadRequestException({
            success: false,
            message:"Unicité violée sur un champ du client.",
            data: null,
          });
      }
      if (error.code === 'P2003') {
        return {
          success: false,
          message: `L'employé avec l'ID ${createClientDto.creerPar} n'existe pas dans la table Employe.`,
          data: null,
        };
      }
      return {
        success: false,
        message: `Erreur lors de la création du client: ${error.message}`,
        data: null,
      };
    }
  }

  async findAll(): Promise<ApiResponse<Client[]>> {
    try {
      const clients = await this.prisma.client.findMany({
        include: {
          creator: {
            select: { nomEmploye: true }
          }
        }
      });
      return {
        success: true,
        message: 'Clients retrieved successfully',
        data: clients,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<Client>> {
    try {
      const client = await this.prisma.client.findUnique({
        where: { idClient: id },
        include: {
          creator: {
            select: { nomEmploye: true }
          }
        }
      });
      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      return {
        success: true,
        message: 'Client retrieved successfully',
        data: client,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<ApiResponse<Client>> {
    try {
      const client = await this.prisma.client.findUnique({
        where: { idClient: id },
      });
      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      const updatedClient = await this.prisma.client.update({
        where: { idClient: id },
        data: {
          nomClient: updateClientDto.nomClient,
          emailClient: updateClientDto.emailClient,
          telClient: updateClientDto.telClient,
          adresseClient: updateClientDto.adresseClient,
          CINClient: updateClientDto.CINClient,
          modifierPar: updateClientDto.modifierPar,
 },
      });
      return {
        success: true,
        message: 'Client updated successfully',
        data: updatedClient,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  async remove(id: number): Promise<ApiResponse<null>> {
    try {
      const client = await this.prisma.client.findUnique({
        where: { idClient: id },
      });
      if (!client) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
      await this.prisma.client.delete({
        where: { idClient: id },
      });
      return {
        success: true,
        message: 'Client deleted successfully',
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}