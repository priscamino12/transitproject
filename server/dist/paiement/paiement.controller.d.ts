import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
export declare class PaiementController {
    private readonly paiementService;
    constructor(paiementService: PaiementService);
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
    findOne(id: string): Promise<{
        status: number;
        success: boolean;
        message: string;
        data: any;
    }>;
    update(id: string, dto: UpdatePaiementDto): Promise<{
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
