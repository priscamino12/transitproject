import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateSuperAdminDto {

    @IsString()
    @IsOptional()
    nomAdmin?: string;


    @IsEmail()
    @IsOptional()
    emailAdmin?: string;

    @IsOptional()
    @IsString()
    motDePasse?: string;
}