import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeModule } from './employe/employe.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { EntrepriseModule } from './entreprise/entreprise.module';
import { AdminSystemeModule } from './admin-systeme/admin-systeme.module';
import { TypeAccesModule } from './type-acces/type-acces.module';
import { ModePaiementModule } from './mode-paiement/mode-paiement.module';
import { PaiementModule } from './paiement/paiement.module';
import { AbonnementModule } from './abonnement/abonnement.module';



@Module({
  imports: [
    AbonnementModule,
    AuthModule,
    AdminSystemeModule,
    ConfigModule.forRoot({isGlobal: true,}),
    ClientModule,
    EmployeModule,
    EntrepriseModule,
    PrismaModule,
    TypeAccesModule,
    ModePaiementModule,
    PaiementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
