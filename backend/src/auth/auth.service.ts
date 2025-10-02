import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { successResponse, errorResponse } from '@/utils/response.utils';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
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
        return errorResponse('Aucun mot de passe défini pour cet utilisateur.', null, 401);
      }
    }

    if (!user) {
      return errorResponse('Utilisateur non trouvé.', null, 401);
    }

    const isPasswordValid = await bcrypt.compare(loginDto.motDePasse, user.motDePasse);
    if (!isPasswordValid) {
      return errorResponse('Mot de passe incorrect.', null, 401);
    }

    // Récupérer id, nom, email, rôle, type
    const role = 'role' in user ? user.role : 'SuperAdmin';
    const type =
      'idAdminSysteme' in user ? 'adminsysteme' :
      'idEmploye' in user ? 'employe' : 'client';

    const id =
      'idAdminSysteme' in user ? user.idAdminSysteme :
      'idEmploye' in user ? user.idEmploye :
      user.idClient;

    const nom =
      'nomAdminSysteme' in user ? user.nomAdminSysteme :
      'nomEmploye' in user ? user.nomEmploye :
      user.nomClient;

    const email =
      'emailAdminSysteme' in user ? user.emailAdminSysteme :
      'emailEmploye' in user ? user.emailEmploye :
      user.emailClient;

    // Générer JWT (mais ne pas le renvoyer)
    const token = this.jwtService.sign({ sub: id, email, role, type });

    // Retourner seulement les infos utilisateur
    const userInfo = { id, nom, email, role, type };

    // On met le token dans le cookie HttpOnly via interceptor ou middleware
    return successResponse('Connexion réussie', { userInfo, token }); 
    // Si tu utilises un interceptor pour le cookie, tu peux supprimer "token" ici
  } catch (error: any) {
    return errorResponse(`Erreur lors de la connexion: ${error.message}`, null, 500);
  }
}

}
