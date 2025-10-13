import { PrismaService } from '../prisma/prisma.service';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
export declare class EntrepriseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateEntrepriseDto): Promise<{
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
    update(id: number, dto: UpdateEntrepriseDto): Promise<{
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
