import { PrismaService } from '../prisma/prisma.service';
import { CreateTypeAccesDto } from './dto/create-type-acces.dto';
import { UpdateTypeAccesDto } from './dto/update-type-acces.dto';
export declare class TypeAccesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateTypeAccesDto): Promise<{
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
    update(id: number, dto: UpdateTypeAccesDto): Promise<{
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
