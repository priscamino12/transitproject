import { PrismaService } from '../prisma/prisma.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
export declare class PaiementService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePaiementDto): Promise<{
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
    update(id: number, dto: UpdatePaiementDto): Promise<{
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
