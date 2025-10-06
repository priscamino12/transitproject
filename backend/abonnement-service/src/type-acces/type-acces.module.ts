import { Module } from '@nestjs/common';
import { TypeAccesService } from './type-acces.service';
import { TypeAccesController } from './type-acces.controller';

@Module({
  providers: [TypeAccesService],
  controllers: [TypeAccesController]
})
export class TypeAccesModule {}
