import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { PaiementModule } from './paiement/paiement.module';
import { TypeAccesModule } from './type-acces/type-acces.module';
import { AbonnementModule } from './abonnement/abonnement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    EntrepriseModule,
    PaiementModule,
    TypeAccesModule,
    AbonnementModule,
  ],

})
export class AppModule {}
