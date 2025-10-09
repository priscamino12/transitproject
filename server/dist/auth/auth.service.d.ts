import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    login(loginDto: LoginDto, res: any): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
    logout(res: any): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
}
