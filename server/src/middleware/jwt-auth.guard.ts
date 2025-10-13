import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.cookies?.['access_token']; // récupère le cookie HttpOnly

        if (!token) {
            throw new UnauthorizedException('Token non fourni');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET'),
            });

            // on attache les infos du user au request pour les controllers
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException('Token invalide ou expiré');
        }

        return true;
    }
}
