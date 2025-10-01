import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

export class CreateClientDto { 
  @IsString({ message: 'Le nom du client doit être une chaîne de caractères.' })
  nomClient!: string;

  @IsEmail({}, { message: "L'email du client doit être une adresse email valide." })
  emailClient!: string;

  @IsString({ message: 'Le numéro de téléphone doit être une chaîne de caractères.' })
  @IsOptional()
  telClient?: string;

  @IsString({ message: "L'adresse du client doit être une chaîne de caractères." })
  @IsOptional()
  adresseClient?: string;

  @IsString({ message: 'Le CIN du client doit être une chaîne de caractères.' })
  CINClient!: string;

  @IsInt({ message: "L'ID de l'employé créateur (creerPar) doit être un entier." })
  creerPar!: number;
}