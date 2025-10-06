import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { AbonnementModule } from './abonnement/abonnement.module';
import { PaiementModule } from './paiement/paiement.module';
import { PaiementController } from './paiement/paiement.controller';
import { TypeAccesModule } from './type-acces/type-acces.module';
import { EntrepriseModule } from './entreprise/entreprise.module';


@Module({
  imports: [AbonnementModule, PaiementModule, TypeAccesModule, EntrepriseModule],
  providers: [PrismaService],
  controllers: [PaiementController],
})
export class AppModule {}
