import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse } from '../types/api-response';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) { }

  async login(loginDto: LoginDto): Promise<{ response: ApiResponse<{ user: { id: number; nom: string; email: string; role: string } }>, token: string }> {
    try {
      let user: any;
      let role: string | null = null;

      // Vérifier dans AdminSysteme
      user = await this.prisma.adminSysteme.findUnique({
        where: { emailAdmin: loginDto.email },
      });
      if (user) {
        role = user.role;
      } else {
        // Vérifier dans Employe
        user = await this.prisma.employe.findUnique({
          where: { emailEmploye: loginDto.email },
        });
        if (user) {
          role = user.role;
        } else {
          // Vérifier dans Client
          user = await this.prisma.client.findUnique({
            where: { emailClient: loginDto.email },
          });
          if (user) {
            role = user.role;
          }
        }
      }
      // Si aucun utilisateur n'est trouvé
      if (!user) {
        throw new UnauthorizedException({
          success: false,
          message: 'Utilisateur non trouvé.',
          data: null,
        });
      }

      // Vérifier le mot de passe
      if (!user.motDePasse) {
        throw new UnauthorizedException({
          success: false,
          message: 'Aucun mot de passe défini pour cet utilisateur.',
          data: null,
        });
      }

      const isPasswordValid = await bcrypt.compare(loginDto.motDePasse, user.motDePasse);
      if (!isPasswordValid) {
        throw new UnauthorizedException({
          success: false,
          message: 'Mot de passe incorrect.',
          data: null,
        });
      }

      // Vérifier que le rôle est défini
      if (!role) {
        throw new UnauthorizedException({
          success: false,
          message: 'Rôle de l\'utilisateur non défini.',
          data: null,
        });
      }

      // Préparer les données de l'utilisateur
      const userData = {
        id: user.idAdmin || user.idEmploye || user.idClient,
        nom: user.nomAdmin || user.nomEmploye || user.nomClient,
        email: user.emailAdmin || user.emailEmploye || user.emailClient,
        role: user.role || role ,
      };

      // Générer le token JWT
      const payload = {
        sub: userData.id,
        email: userData.email,
        role: userData.role,
      };
      const token = this.jwtService.sign(payload);

      return {
        response: {
          success: true,
          message: 'Authentification réussie',
          data: { user: userData },
        },
        token,
      };
    } catch (error: any) {
      throw new UnauthorizedException({
        success: false,
        message: `${error.message}`,
        data: null,
      });
    }
  }
}
