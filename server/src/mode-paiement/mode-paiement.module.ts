import { Module } from '@nestjs/common';
import { ModePaiementService } from './mode-paiement.service';
import { ModePaiementController } from './mode-paiement.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ModePaiementService,PrismaService],
  controllers: [ModePaiementController]
})
export class ModePaiementModule {}
