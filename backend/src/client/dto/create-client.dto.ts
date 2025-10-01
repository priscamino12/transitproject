import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateClientDto {
  @IsString()
  nomClient!: string;

  @IsEmail()
  emailClient!: string;

  @IsOptional()
  @IsString()
  telClient?: string;

  @IsOptional()
  @IsString()
  adresseClient?: string;

  @IsString()
  CINClient!: string;

  @IsOptional()
  @IsString()
  motDePasse?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsInt()
  idEntreprise!: number;

  @IsInt()
  creerPar!: number;
}