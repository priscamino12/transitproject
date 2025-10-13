import { Module } from '@nestjs/common';
import { AbonnementService } from './abonnement.service';
import { AbonnementController } from './abonnement.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AbonnementController],
  providers: [AbonnementService, PrismaService],
  exports: [AbonnementService],
})
export class AbonnementModule {}