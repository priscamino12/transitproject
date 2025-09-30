import { IsString, IsEmail } from 'class-validator';

export class CreateEmployeDto {
  @IsString()
  nomEmploye!: string;

  @IsEmail()
  emailEmploye!: string;

  @IsString()
  motDePasse!: string;

  @IsString()
  typeEmploye!: string;
}