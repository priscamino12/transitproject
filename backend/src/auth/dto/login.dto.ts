import { IsString, IsEmail } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  motDePasse!: string;
}