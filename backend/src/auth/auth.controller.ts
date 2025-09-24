import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(200)
    async authentification(
        @Body() body: { email: string; password: string },
        @Res() res: Response,
    ) {

        const { user, token } = await this.authService.authenticate(body.email, body.password);

        // Placer le token dans un cookie HttpOnly
        res.cookie('jwt', token, {
            httpOnly: true, // 🔒 empêche l’accès depuis JS côté client
            secure: process.env.NODE_ENV === 'production', // 🔒 seulement HTTPS en prod
            sameSite: 'strict', // 🔒 protège contre CSRF basique
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 jours 
        });

        return res.send({ message: 'Connexion réussie', data: user });

    }

    @Post('logout')
    @HttpCode(200)
    logout(@Res() res: Response) {
        res.clearCookie('jwt');
        return res.send({ message: 'Déconnexion réussie' });
    }

    @Post('forgot-password')
    @HttpCode(200)
    async forgotPassword(@Body() body: { email: string }) {
        const { token } = await this.authService.forgotPwd(body.email);
        return { token, message: 'Code d\'accès temporaire envoyé avec succès.' };
    }

    @Post('reset-password')
    @HttpCode(200)
    async resetPassword(@Body() body: { token: string; newPassword: string; email: string; codeTemp: string }) {
        await this.authService.resetPwd(body.token, body.newPassword, body.email, body.codeTemp);
        return { message: 'Mot de passe réinitialisé avec succès.' };
    }
}