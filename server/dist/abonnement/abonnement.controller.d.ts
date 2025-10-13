import { AbonnementService } from './abonnement.service';
import { CreateAbonnementDto } from './dto/create-abonnement.dto';
import { UpdateAbonnementDto } from './dto/updtate.abonnement.dto';
export declare class AbonnementController {
    private readonly abonnementService;
    constructor(abonnementService: AbonnementService);
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
    findOne(id: string): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
    update(id: string, dto: UpdateAbonnementDto): Promise<{
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
