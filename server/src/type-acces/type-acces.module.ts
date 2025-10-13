import { Module } from '@nestjs/common';
import { TypeAccesService } from './type-acces.service';
import { TypeAccesController } from './type-acces.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TypeAccesService,PrismaService],
  controllers: [TypeAccesController]
})
export class TypeAccesModule {}
