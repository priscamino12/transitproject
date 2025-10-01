import { IsString, IsEmail } from 'class-validator';

export class CreateSuperAdminDto {
  @IsString()
  nomAdmin: string;

  @IsEmail()
  emailAdmin: string;

  @IsString()
  motDePasse: string;
}