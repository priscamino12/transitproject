import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateEmployeDto {
  @IsString()
  nomEmploye!: string;

  @IsEmail()
  emailEmploye!: string;

  @IsString()
  motDePasse!: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsInt()
  idEntreprise!: number;
}