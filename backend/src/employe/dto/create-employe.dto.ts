import { IsString, IsEmail, IsInt, IsOptional } from 'class-validator';

export class CreateEmployeDto {
  @IsString()
  nomEmploye!: string;

  @IsEmail()
  emailEmploye!: string;

  @IsString()
  motDePasse!: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsInt()
  idEntreprise!: number;
}