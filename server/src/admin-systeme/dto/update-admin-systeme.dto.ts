import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateAdminSystemeDto {
  @IsOptional()
  @IsString()
  nomAdminSysteme?: string;

  @IsOptional()
  @IsEmail()
  emailAdminSysteme?: string;

  @IsOptional()
  @IsString()
  motDePasse?: string;
}