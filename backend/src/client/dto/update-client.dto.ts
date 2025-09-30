import { IsString, IsEmail, IsOptional, Length, IsInt } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  @Length(2, 50, { message: 'Le nom doit contenir entre 2 et 50 caractères.' })
  nomClient?: string;

  @IsEmail({}, { message: 'Veuillez fournir une adresse email valide.' })
  @IsOptional()
  emailClient?: string;

  @IsString({ message: 'Le numéro de téléphone doit être une chaîne de caractères.' })
  @IsOptional()
  telClient?: string;

  @IsString()
  @IsOptional()
  @Length(5, 100, { message: 'L’adresse doit contenir entre 5 et 100 caractères.' })
  adresseClient?: string;

  @IsString({ message: 'Le CIN du client doit être une chaîne de caractères.' })
  @IsOptional()
  CINClient?: string;

  @IsInt({ message: "L'ID de l'employé qui modifie doit être un entier." })
  @IsOptional()
  modifierPar?: number;
}
