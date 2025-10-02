import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { ApiResponse } from '../types/api-response';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async authenticate(email: string, password: string): Promise<ApiResponse<{ user: any; token: string }>> {
    const employe = await this.prisma.employe.findUnique({
      where: { emailEmploye: email },
    });

    if (!employe) {
      throw new UnauthorizedException({
        success: false,
        message: 'Vous ne faites pas partie de notre équipe.',
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, employe.motDePasse);
    if (!isPasswordValid) {
      throw new UnauthorizedException({
        success: false,
        message: 'Mot de passe incorrect.',
        data: null,
      });
    }

    const payload = { sub: employe.idEmploye, email: employe.emailEmploye, role: employe.typeEmploye };
    const token = this.jwtService.sign(payload);
    const user = {
      id: employe.idEmploye,
      email: employe.emailEmploye,
      role: employe.typeEmploye,
      nom: employe.nomEmploye,
    };

    return {
      success: true,
      message: 'Authentification réussie',
      data: { user, token },
    };
  }

  async forgotPwd(email: string): Promise<ApiResponse<{ token: string }>> {
    const employe = await this.prisma.employe.findUnique({
      where: { emailEmploye: email },
    });

    if (!employe) {
      throw new BadRequestException({
        success: false,
        message: 'Utilisateur non trouvé.',
        data: null,
      });
    }

    const codeTemp = Math.floor(100000 + Math.random() * 900000).toString();
    const codeTempExpires = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.employe.update({
      where: { emailEmploye: email },
      data: {
        codeTemp,
        codeTempExpires,
      },
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Votre code temporaire est : ${codeTemp}. Il expire dans 15 minutes.`,
    });

    const payload = { sub: employe.idEmploye, email: employe.emailEmploye };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Code temporaire envoyé avec succès.',
      data: { token },
    };
  }

  async resetPwd(token: string, newPassword: string, email: string, codeTemp: string): Promise<ApiResponse<null>> {
    let payload;
    try {
      payload = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        success: false,
        message: 'Réinitialisation impossible.',
        data: null,
      });
    }

    if (payload.email !== email) {
      throw new UnauthorizedException({
        success: false,
        message: 'Token invalide.',
        data: null,
      });
    }

    const employe = await this.prisma.employe.findUnique({
      where: { emailEmploye: email },
    });

    if (!employe || employe.codeTemp !== codeTemp || !employe.codeTempExpires) {
      throw new BadRequestException({
        success: false,
        message: 'Code temporaire invalide.',
        data: null,
      });
    }

    if (new Date() > employe.codeTempExpires) {
      throw new BadRequestException({
        success: false,
        message: 'Code temporaire expiré.',
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.employe.update({
      where: { emailEmploye: email },
      data: {
        motDePasse: hashedPassword,
        codeTemp: null,
        codeTempExpires: null,
      },
    });

    return {
      success: true,
      message: 'Mot de passe réinitialisé avec succès.',
      data: null,
    };
  }
}