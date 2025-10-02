import { IsString, IsEmail } from 'class-validator';

export class LoginSuperAdminDto {
  @IsEmail()
  emailAdmin: string;

  @IsString()
  motDePasse: string;
}