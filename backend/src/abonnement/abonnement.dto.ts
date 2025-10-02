import { IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreateAbonnementDto {
  @IsInt()
  idEntreprise!: number;

  @IsInt()
  typeAccesId!: number;

  @IsDateString()
  dateDebut!: string;

  @IsDateString()
  dateFin!: string;
}

export class UpdateAbonnementDto {
  @IsInt()
  @IsOptional()
  idEntreprise?: number;

  @IsInt()
  @IsOptional()
  typeAccesId?: number;

  @IsDateString()
  @IsOptional()
  dateDebut?: string;

  @IsDateString()
  @IsOptional()
  dateFin?: string;
}