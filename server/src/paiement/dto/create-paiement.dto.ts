import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaiementDto {
  @IsNotEmpty()
  @IsNumber()
  abonnementId!: number;

  @IsNotEmpty()
  @IsNumber()
  entrepriseId!: number;

  @IsNotEmpty()
  @IsNumber()
  modePaiementId!: number;

  @IsNotEmpty()
  @IsNumber()
  montant!: number;
}