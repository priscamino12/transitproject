import { Module } from '@nestjs/common';
import { EntrepriseService } from './entreprise.service';
import { EntrepriseController } from './entreprise.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EntrepriseController],
  providers: [EntrepriseService, PrismaService],
  exports: [EntrepriseService],
})
export class EntrepriseModule {}