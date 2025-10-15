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
        data: {
            token: string;
            userInfo: {
                id: number;
                nom: string;
                email: string;
                role: string;
                type: string;
                entreprise: {
                    idEntreprise: number;
                    nomEntreprise: string;
                    logoEntreprise: string | null;
                };
            };
        };
    }>;
    logout(res: any): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
}
