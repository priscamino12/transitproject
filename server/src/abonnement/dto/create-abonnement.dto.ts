import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateAbonnementDto {
  @IsNumber()
  typeAccesId!: number;

  @IsDateString()
  dateDebut!: string;

  @IsDateString()
  dateFin!: string;

  @IsNumber()
  reductionPourcentage!: number;
}
