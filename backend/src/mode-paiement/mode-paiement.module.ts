import { Module } from '@nestjs/common';
import { ModePaiementService } from './mode-paiement.service';
import { ModePaiementController } from './mode-paiement.controller';

@Module({
  providers: [ModePaiementService],
  controllers: [ModePaiementController]
})
export class ModePaiementModule {}
