import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsString()
  nomClient: string;

  @IsString()
  @IsOptional()
  CINClient?: string;

  @IsEmail()
  emailClient: string;

  @IsString()
  telClient: string;

  @IsString()
  @IsOptional()
  adresseClient?: string;

  @IsString()
  creerPar: string;

  @IsString()
  @IsOptional()
  modifierPar?: string;
}