import { PrismaService } from '../prisma/prisma.service';
import { CreateAbonnementDto } from './dto/create-abonnement.dto';
import { UpdateAbonnementDto } from './dto/updtate.abonnement.dto';
export declare class AbonnementService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAbonnementDto): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
    findAll(): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
    findOne(id: number): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
    update(id: number, dto: UpdateAbonnementDto): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
    remove(id: number): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
}
