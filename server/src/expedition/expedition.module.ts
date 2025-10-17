import { Module } from '@nestjs/common';
import { ExpeditionService } from './expedition.service';
import { ExpeditionController } from './expedition.controller';

@Module({
  providers: [ExpeditionService],
  controllers: [ExpeditionController]
})
export class ExpeditionModule {}
