// src/interceptors/jwt-cookie.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Response } from 'express';
import { tap } from 'rxjs';

@Injectable()
export class JwtCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      tap((data) => {
        if (data?.data?.token) {
          response.cookie('jwt', data.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 * 1000 * 24 * 90, // 90 jours
          });
          // Supprimer le token de la réponse pour le frontend
          delete data.data.token;
        }
      }),
    );
  }
}
