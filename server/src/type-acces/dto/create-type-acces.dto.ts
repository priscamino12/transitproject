import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTypeAccesDto {
  @IsNotEmpty()
  @IsString()
  nom!: string;

  @IsNotEmpty()
  @IsNumber()
  prixBase!: number;
}