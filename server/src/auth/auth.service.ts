import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/login.dto';
import { LoginDto } from './dto/login.dto';
import { successResponse, errorResponse } from '../common/response.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

 async login(loginDto: LoginDto, res: any) {
  const employe = await this.prisma.employe.findUnique({
    where: { emailEmploye: loginDto.email },
    include: {
      entreprise: {
        select: {
          idEntreprise: true,
          nomEntreprise: true,
          logoEntreprise: true,
        },
      },
    },
  });

  if (!employe) {
    throw new UnauthorizedException("Email ou mot de passe incorrect");
  }

  const isMatch = await bcrypt.compare(loginDto.password, employe.motDePasse);
  if (!isMatch) {
    throw new UnauthorizedException("Email ou mot de passe incorrect");
  }

  const payload = {
    sub: employe.idEmploye,
    email: employe.emailEmploye,
    role: employe.role,
    type: "employe",
  };

  const token = this.jwtService.sign(payload);

  return {
    status: 200,
    success: true,
    message: "Connexion réussie",
    data: {
      token,
      userInfo: {
        id: employe.idEmploye,
        nom: employe.nomEmploye,
        email: employe.emailEmploye,
        role: employe.role,
        type: "employe",
        entreprise: employe.entreprise,
      },
    },
  };
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

  // auth.service.ts

  /* async createUser(dto: CreateUserDto) {
  const hashedPassword = await bcrypt.hash(dto.password, 10);

  let user;

  if (dto.role === 'SuperAdmin') {
    // Création d’un SuperAdmin dans la table AdminSysteme
    user = await this.prisma.adminSysteme.create({
      data: {
        nomAdminSysteme: dto.nom,
        emailAdminSysteme: dto.email,
        motDePasse: hashedPassword,
        role: 'SuperAdmin',
      },
    });
  } else if (dto.role === 'admin') {
    // Création d’un Employé (Admin)
    user = await this.prisma.employe.create({
      data: {
        nomEmploye: dto.nom,
        emailEmploye: dto.email,
        motDePasse: hashedPassword,
        role: 'admin',
      },
    });
  } else if (dto.role === 'client') {
    // Création d’un Client
    user = await this.prisma.client.create({
      data: {
        nomClient: dto.nom,
        emailClient: dto.email,
        motDePasse: hashedPassword,
        role: 'client',
      },
    });
  } else {
    throw new Error(`Rôle invalide : ${dto.role}`);
  }

  return { message: 'Utilisateur créé avec succès', user }
}  */


}

