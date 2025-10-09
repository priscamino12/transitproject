import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
export class CreateUserDto {
  nom: string;
  email: string;
  password: string;
  role: 'SuperAdmin' | 'admin' | 'client';
}
