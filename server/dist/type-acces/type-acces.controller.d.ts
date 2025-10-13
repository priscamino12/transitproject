import { TypeAccesService } from './type-acces.service';
import { CreateTypeAccesDto } from './dto/create-type-acces.dto';
import { UpdateTypeAccesDto } from './dto/update-type-acces.dto';
export declare class TypeAccesController {
    private readonly typeAccesService;
    constructor(typeAccesService: TypeAccesService);
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
    findOne(id: string): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
    update(id: string, dto: UpdateTypeAccesDto): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
    remove(id: string): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
}
