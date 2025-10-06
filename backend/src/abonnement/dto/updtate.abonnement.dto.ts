import { PartialType } from '@nestjs/mapped-types';
import { CreateAbonnementDto } from './create-abonnement.dto';

export class UpdateAbonnementDto extends PartialType(CreateAbonnementDto) {}