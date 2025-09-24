import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  // Authentification : Vérifie les identifiants et renvoie un token JWT
  async authenticate(email: string, password: string) {
    const employe = await this.prisma.employe.findUnique({
      where: { emailEmploye: email },
    });

    if (!employe) {
      throw new UnauthorizedException('Identifiants invalides.');
    }

    const isPasswordValid = await bcrypt.compare(password, employe.motDePasse);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides.');
    }
    const payload = { sub: employe.idEmploye, email: employe.emailEmploye, role: employe.typeEmploye };
    const token = this.jwtService.sign(payload);
    // Renvoie à la fois token et info user
    const user = {
      email: employe.emailEmploye,
      role: employe.typeEmploye,
      nom: employe.nomEmploye,
    };

    return { user, token };
  }

  // Mot de passe oublié : Génère un code temporaire et l'envoie par e-mail
  async forgotPwd(email: string) {
    const employe = await this.prisma.employe.findUnique({
      where: { emailEmploye: email },
    });

    if (!employe) {
      throw new BadRequestException('Utilisateur non trouvé.');
    }

    // Générer un code temporaire (par exemple, 6 chiffres)
    const codeTemp = Math.floor(100000 + Math.random() * 900000).toString();
    const codeTempExpires = new Date(Date.now() + 15 * 60 * 1000); // Expire dans 15 minutes

    // Mettre à jour l'employé avec le code temporaire
    await this.prisma.employe.update({
      where: { emailEmploye: email },
      data: {
        codeTemp,
        codeTempExpires,
      },
    });

    // Envoyer le code par e-mail
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Remplacez par votre service d'e-mail
      auth: {
        user: 'votre_email@gmail.com', // Remplacez par votre adresse e-mail
        pass: 'votre_mot_de_passe_app', // Remplacez par un mot de passe d'application
      },
    });

    await transporter.sendMail({
      from: 'votre_email@gmail.com',
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      text: `Votre code temporaire est : ${codeTemp}. Il expire dans 15 minutes.`,
    });

    // Générer un token JWT pour la réinitialisation
    const payload = { sub: employe.idEmploye, email: employe.emailEmploye };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  // Réinitialisation du mot de passe
  async resetPwd(token: string, newPassword: string, email: string, codeTemp: string) {
    try {
      // Vérifier le token JWT
      const payload = this.jwtService.verify(token);
      if (payload.email !== email) {
        throw new UnauthorizedException('Token invalide.');
      }

      // Vérifier l'employé et le code temporaire
      const employe = await this.prisma.employe.findUnique({
        where: { emailEmploye: email },
      });

      if (!employe || employe.codeTemp !== codeTemp || !employe.codeTempExpires) {
        throw new BadRequestException('Code temporaire invalide.');
      }

      // Vérifier si le code est expiré
      if (new Date() > employe.codeTempExpires) {
        throw new BadRequestException('Code temporaire expiré.');
      }

      // Hacher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Mettre à jour le mot de passe et supprimer le code temporaire
      await this.prisma.employe.update({
        where: { emailEmploye: email },
        data: {
          motDePasse: hashedPassword,
          codeTemp: null,
          codeTempExpires: null,
        },
      });
    } catch (error) {
      throw new UnauthorizedException('Réinitialisation impossible.');
    }
  }
}