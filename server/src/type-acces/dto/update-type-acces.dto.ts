import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeAccesDto } from './create-type-acces.dto';

export class UpdateTypeAccesDto extends PartialType(CreateTypeAccesDto) {}