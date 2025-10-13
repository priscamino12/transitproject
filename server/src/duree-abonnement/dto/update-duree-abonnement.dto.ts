import { PartialType } from '@nestjs/mapped-types';
import { CreateDureeAbonnementDto } from './create-duree-abonnement.dto';


export class UpdateDureeAbonnementDto extends PartialType(CreateDureeAbonnementDto) {} 