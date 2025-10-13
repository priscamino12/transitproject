import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { PaiementModule } from './paiement/paiement.module';
import { TypeAccesModule } from './type-acces/type-acces.module';
import { AbonnementModule } from './abonnement/abonnement.module';
import { ModePaiementModule } from './mode-paiement/mode-paiement.module';
import { EmployeModule } from './employe/employe.module';
import { AdminSystemeModule } from './admin-systeme/admin-systeme.module';
import { DureeAbonnementModule } from './duree-abonnement/duree-abonnement.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    AdminSystemeModule,
    EntrepriseModule,
    EmployeModule,
    ModePaiementModule,
    PaiementModule,
    TypeAccesModule,
    AbonnementModule,
    DureeAbonnementModule,
  ],

})
export class AppModule {}
