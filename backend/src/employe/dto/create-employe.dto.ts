import { IsString, IsEmail, IsEnum } from 'class-validator';

export class CreateEmployeDto {
  @IsString()
  nomEmploye: string;

  @IsEmail()
  emailEmploye: string;

  @IsString()
  motDePasse: string;

  @IsEnum(['Employe', 'Admin'])
  typeEmploye: string;
}