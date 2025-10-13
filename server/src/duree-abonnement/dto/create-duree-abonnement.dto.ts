import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateDureeAbonnementDto {
    @IsNotEmpty()
    @IsString()
    nom!: string;

    @IsNotEmpty()
    @IsNumber()
    nbMois !: number;

    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Max(1)
    reduction!: number; // Ex: 0.05 = 5% de réduction
}   