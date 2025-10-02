import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class UpdateEmployeDto {
  @IsOptional()
  @IsString()
  nomEmploye?: string;

  @IsOptional()
  @IsEmail()
  emailEmploye?: string;

  @IsOptional()
  @IsString()
  motDePasse?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsInt()
  idEntreprise?: number;
}