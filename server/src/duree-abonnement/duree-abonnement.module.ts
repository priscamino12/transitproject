import { Module } from '@nestjs/common';
import { DureeAbonnementService } from './duree-abonnement.service';
import { DureeAbonnementController } from './duree-abonnement.controller';

@Module({
  providers: [DureeAbonnementService],
  controllers: [DureeAbonnementController]
})
export class DureeAbonnementModule {}
