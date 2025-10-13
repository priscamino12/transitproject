import { EntrepriseService } from './entreprise.service';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';
export declare class EntrepriseController {
    private readonly entrepriseService;
    constructor(entrepriseService: EntrepriseService);
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
    findOne(id: string): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
    update(id: string, dto: UpdateEntrepriseDto): Promise<{
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
