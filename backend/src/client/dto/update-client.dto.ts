import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  nomClient?: string;

  @IsOptional()
  @IsEmail()
  emailClient?: string;

  @IsOptional()
  @IsString()
  telClient?: string;

  @IsOptional()
  @IsString()
  adresseClient?: string;

  @IsOptional()
  @IsString()
  CINClient?: string;

  @IsOptional()
  @IsString()
  motDePasse?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsInt()
  idEntreprise?: number;

  @IsOptional()
  @IsInt()
  modifierPar?: number;
}