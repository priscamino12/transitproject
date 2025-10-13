import { Module } from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { PaiementController } from './paiement.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PaiementService,PrismaService],
  controllers: [PaiementController]
})
export class PaiementModule {}
