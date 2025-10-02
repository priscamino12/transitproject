// src/auth/auth.controller.ts
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtCookieInterceptor } from '@/interceptors/jwt-cookie.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UseInterceptors(JwtCookieInterceptor)
  async login(@Body() loginDto: LoginDto) {
    // Retourne seulement successResponse avec userInfo
    return this.authService.login(loginDto);
  }

}