import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateModePaiementDto {
  @IsNotEmpty()
  @IsString()
  nom!: string;

  @IsOptional()
  @IsNumber()
  frais?: number;
} 