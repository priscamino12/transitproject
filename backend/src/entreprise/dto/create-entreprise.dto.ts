import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateEntrepriseDto {
  @IsNotEmpty()
  @IsString()
  nomEntreprise!: string;

  @IsOptional()
  @IsString()
  logoEntreprise?: string;

  @IsOptional() 
  @IsString()
  adresseEntreprise?: string;

  @IsNotEmpty()
  @IsString()
  nif!: string;

  @IsOptional()
  @IsString()
  statJuridique?: string;

  @IsNotEmpty()
  @IsInt()
  typeAccesId!: number;
}
