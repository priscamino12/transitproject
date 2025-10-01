import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.jwt;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
    });
  }

  async validate(payload: { sub: number; email: string; role: string }) {
    let user: any;

    if (payload.role === 'SuperAdmin') {
      user = await this.prisma.adminSysteme.findUnique({ where: { idAdmin: payload.sub } });
    } else if (payload.role === 'admin' || payload.role === 'employe') {
      user = await this.prisma.employe.findUnique({ where: { idEmploye: payload.sub } });
    } else if (payload.role === 'client') {
      user = await this.prisma.client.findUnique({ where: { idClient: payload.sub } });
    }

    if (!user) {
      return null;
    }

    return {
      id: user.idAdmin || user.idEmploye || user.idClient,
      email: user.emailAdmin || user.emailEmploye || user.emailClient,
      role: payload.role,
    };
  }
}