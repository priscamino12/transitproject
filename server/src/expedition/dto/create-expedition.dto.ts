import { IsString, IsDate, IsInt } from 'class-validator';

export class CreateExpeditionDto {
    @IsInt()
    idExpedition !: number;

    @IsInt()
    idDestinataire !: number;

    @IsInt()
    idDossier!: number;

    @IsInt()
    creerPar!: number;

}