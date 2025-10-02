import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateSuperAdminDto {
  @IsString()
  nomAdmin!: string;

  @IsEmail()
  emailAdmin!: string;

  @IsString()
  motDePasse!: string;
}