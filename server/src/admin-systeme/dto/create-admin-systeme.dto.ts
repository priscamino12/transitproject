import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateAdminSystemeDto {
  @IsString()
  nomAdminSysteme!: string;

  @IsEmail()
  emailAdminSysteme!: string;

  @IsString()
  motDePasse!: string;

}
