import { IsString, IsDate, IsInt } from 'class-validator';

export class CreateDossierDto {
    @IsString()
    nomDossier!: string;

    @IsString()
    typeTransport!: string;

    @IsString()
    mode!: string;

    @IsString()
    codeDossier !: string;

    @IsString()
    origine!: string;

    @IsString()
    destination!: string;

    @IsString()
    description!: string;

    @IsDate()
    dateOuverture!: Date;

    @IsInt()
    creerPar!: number;

}