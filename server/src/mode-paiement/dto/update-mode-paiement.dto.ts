import { PartialType } from '@nestjs/mapped-types';
import { CreateModePaiementDto } from './create-mode-paiement.dto';

export class UpdateModePaiementDto extends PartialType(CreateModePaiementDto) {} 