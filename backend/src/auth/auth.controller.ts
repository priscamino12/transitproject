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

        // const { user, token } = await this.authService.authenticate(body.email, body.password);

        const response = await this.authService.authenticate(body.email, body.password);

        if (!response.success || !response.data) {
            return res.status(401).json(response);
        }

        const { user, token } = response.data

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 jours
        });

        return res.json({
            success: response.success,
            message: response.message,
            data: user, // Retourner uniquement user dans data
        });

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
        const response = await this.authService.forgotPwd(body.email);

        if (!response.success || !response.data) {
            return { message: response.message };
        }

        return {
            token: response.data.token,
            message: response.message,
        };
    }

    @Post('reset-password')
    @HttpCode(200)
    async resetPassword(@Body() body: { token: string; newPassword: string; email: string; codeTemp: string }) {
        await this.authService.resetPwd(body.token, body.newPassword, body.email, body.codeTemp);
        return { message: 'Mot de passe réinitialisé avec succès.' };
    }
}