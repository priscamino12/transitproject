import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiResponse } from '../types/api-response';
import { Client } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

// Type personnalisé pour exclure motDePasse
type ClientResponse = Omit<Client, 'motDePasse'>;

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto): Promise<ApiResponse<ClientResponse>> {
    try {
      // Vérifier si l'entreprise existe
      const entreprise = await this.prisma.entreprise.findUnique({
        where: { idEntreprise: createClientDto.idEntreprise },
      });
      if (!entreprise) {
        return {
          success: false,
          message: 'Entreprise non trouvée',
          data: null,
        };
      }

      const data = { ...createClientDto };
      if (data.motDePasse) {
        data.motDePasse = await bcrypt.hash(data.motDePasse, 10);
      }
      const client = await this.prisma.client.create({
        data,
      });
      const { motDePasse, ...clientResponse } = client;
      return {
        success: true,
        message: 'Client créé avec succès',
        data: clientResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la création du client: ${error.message}`,
        data: null,
      };
    }
  }

  async findAll(): Promise<ApiResponse<ClientResponse[]>> {
    try {
      const clients = await this.prisma.client.findMany();
      const clientsResponse = clients.map(({ motDePasse, ...client }) => client);
      return {
        success: true,
        message: 'Clients récupérés avec succès',
        data: clientsResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la récupération des clients: ${error.message}`,
        data: null,
      };
    }
  }

  async findOne(id: number): Promise<ApiResponse<ClientResponse>> {
    try {
      const client = await this.prisma.client.findUnique({
        where: { idClient: id },
      });
      if (!client) {
        return {
          success: false,
          message: 'Client non trouvé',
          data: null,
        };
      }
      const { motDePasse, ...clientResponse } = client;
      return {
        success: true,
        message: 'Client récupéré avec succès',
        data: clientResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la récupération du client: ${error.message}`,
        data: null,
      };
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<ApiResponse<ClientResponse>> {
    try {
      const client = await this.prisma.client.findUnique({
        where: { idClient: id },
      });
      if (!client) {
        return {
          success: false,
          message: 'Client non trouvé',
          data: null,
        };
      }
      if (updateClientDto.idEntreprise) {
        const entreprise = await this.prisma.entreprise.findUnique({
          where: { idEntreprise: updateClientDto.idEntreprise },
        });
        if (!entreprise) {
          return {
            success: false,
            message: 'Entreprise non trouvée',
            data: null,
          };
        }
      }
      const data = { ...updateClientDto };
      if (data.motDePasse) {
        data.motDePasse = await bcrypt.hash(data.motDePasse, 10);
      }
      const updatedClient = await this.prisma.client.update({
        where: { idClient: id },
        data,
      });
      const { motDePasse, ...clientResponse } = updatedClient;
      return {
        success: true,
        message: 'Client mis à jour avec succès',
        data: clientResponse,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la mise à jour du client: ${error.message}`,
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
        return {
          success: false,
          message: 'Client non trouvé',
          data: null,
        };
      }
      await this.prisma.client.delete({
        where: { idClient: id },
      });
      return {
        success: true,
        message: 'Client supprimé avec succès',
        data: null,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Erreur lors de la suppression du client: ${error.message}`,
        data: null,
      };
    }
  }
}