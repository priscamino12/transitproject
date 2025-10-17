import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { successResponse, errorResponse } from '../utils/response.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async login(loginDto: LoginDto, res: any) {
    try {
      let user: any = await this.prisma.adminSysteme.findUnique({
        where: { emailAdminSysteme: loginDto.email },
      });

      if (!user) {
        user = await this.prisma.employe.findUnique({
          where: { emailEmploye: loginDto.email },
        });
      }

      if (!user) {
        user = await this.prisma.client.findUnique({
          where: { emailClient: loginDto.email },
        });
        if (user && !user.motDePasse) {
          return errorResponse('Aucun mot de passe défini.', null, 401);
        }
      }

      if (!user) {
        return errorResponse('Utilisateur non trouvé.', null, 401);
      }

      const isPasswordValid = await bcrypt.compare(loginDto.password, user.motDePasse);
      if (!isPasswordValid) {
        return errorResponse('Mot de passe incorrect.', null, 401);
      }

      const role = 'role' in user ? user.role : 'SuperAdmin';
      const type =
        'idAdminSysteme' in user ? 'adminsysteme' :
          'idEmploye' in user ? 'employe' : 'client';

      const id =
        'idAdminSysteme' in user ? user.idAdminSysteme :
          'idEmploye' in user ? user.idEmploye : user.idClient;

      const nom =
        'nomAdminSysteme' in user ? user.nomAdminSysteme :
          'nomEmploye' in user ? user.nomEmploye : user.nomClient;

      const email =
        'emailAdminSysteme' in user ? user.emailAdminSysteme :
          'emailEmploye' in user ? user.emailEmploye : user.emailClient;

      const token = this.jwtService.sign({ sub: id, email, role, type });

      // On met le token dans un cookie HttpOnly
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: this.configService.get<string>('NODE_ENV') === 'production',
        maxAge: 60 * 60 * 1000 * 24 * 90, // 90 jours
      });


      const userInfo = { userInfo: { id, nom, email, role, type } }
      if (type === 'employe') {
        const entrepriseInfo = await this.prisma.employe.findUnique({
          where: { idEmploye: id },
          select: {
            entreprise: {
              select: {
                idEntreprise: true,
                nomEntreprise: true,
              },
            },
          },
        });
        userInfo['entreprise'] = entrepriseInfo?.entreprise || null;
         }

      return successResponse('Connexion réussie', userInfo);
    } catch (error: any) {
      return errorResponse(`Erreur lors de la connexion: ${error.message}`, null, 500);
    }
  }

  async logout(res: any) {
    try {
      // Supprimer le cookie
      res.clearCookie('access_token', {
        httpOnly: true,
        secure: this.configService.get<string>('NODE_ENV') === 'production',
        sameSite: 'lax',
      });
      return successResponse('Déconnexion réussie.', null, 200);
    } catch (err) {
      return errorResponse('Erreur serveur lors de la déconnexion.')
    }
  }
}