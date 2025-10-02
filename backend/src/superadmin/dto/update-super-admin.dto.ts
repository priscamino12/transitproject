import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateSuperAdminDto {
  @IsOptional()
  @IsString()
  nomAdmin?: string;

  @IsOptional()
  @IsEmail()
  emailAdmin?: string;

  @IsOptional()
  @IsString()
  motDePasse?: string;
}