import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.['access_token']; // On prend le JWT du cookie

    // Exclure certaines routes (login/logout/public)
    if (req.path.includes('/auth/login') || req.path.includes('/auth/logout')) {
      return next();
    }

    if (!token) {
      throw new UnauthorizedException('Pas de token fourni');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      req['user'] = payload; // attache les infos au request
      next(); // continue la requête
    } catch (error) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}
