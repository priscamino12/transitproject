import { Module } from '@nestjs/common';
import { AbonnementService } from './abonnement.service';
import { AbonnementController } from './abonnement.controller';

@Module({
  providers: [AbonnementService],
  controllers: [AbonnementController]
})
export class AbonnementModule {}
