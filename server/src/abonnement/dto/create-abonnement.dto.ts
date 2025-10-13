import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateAbonnementDto {
  @IsNumber()
  typeAccesId!: number;

  @IsNumber()
  dureeAbonnementId!: number;

}
