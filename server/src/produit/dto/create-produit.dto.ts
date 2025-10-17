import {  IsInt } from 'class-validator';

export class CreateProduitDto {
    @IsInt()
    idExpedition !: number;

    @IsInt()
    idDestinataire !: number;

    @IsInt()
    idDossier!: number;

    @IsInt()
    creerPar!: number;

}