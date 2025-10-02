import { IsString, IsEmail, IsInt, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { StatusAbonnement } from '@prisma/client';

export class CreateEntrepriseDto {
  @IsString()
  nomEntreprise!: string;

  @IsString()
  @IsOptional()
  logoEntreprise?: string;

  @IsString()
  @IsOptional()
  adresseEntreprise?: string;

  @IsString()
  nif!: string;

  @IsString()
  @IsOptional()
  statJuridique?: string;

  @IsInt()
  typeAccesId!: number;

  @IsEnum(StatusAbonnement)
  @IsOptional()
  statusAbonnement?: StatusAbonnement;

  @IsDateString()
  @IsOptional()
  dateDebutAbonnement?: string;

  @IsDateString()
  @IsOptional()
  dateFinAbonnement?: string;
}

export class UpdateEntrepriseDto {
  @IsString()
  @IsOptional()
  nomEntreprise?: string;

  @IsString()
  @IsOptional()
  logoEntreprise?: string;

  @IsString()
  @IsOptional()
  adresseEntreprise?: string;

  @IsString()
  @IsOptional()
  nif?: string;

  @IsString()
  @IsOptional()
  statJuridique?: string;

  @IsInt()
  @IsOptional()
  typeAccesId?: number;

  @IsEnum(StatusAbonnement)
  @IsOptional()
  statusAbonnement?: StatusAbonnement;

  @IsDateString()
  @IsOptional()
  dateDebutAbonnement?: string;

  @IsDateString()
  @IsOptional()
  dateFinAbonnement?: string;
}
