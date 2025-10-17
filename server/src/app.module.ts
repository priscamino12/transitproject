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
import { DossierModule } from './dossier/dossier.module';
import { StatusModule } from './status/status.module';
import { ExpeditionModule } from './expedition/expedition.module';
import { ProduitController } from './produit/produit.controller';
import { DocumentController } from './document/document.controller';
import { DocumentService } from './document/document.service';
import { ProduitService } from './produit/produit.service';


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
    DossierModule,
    StatusModule,
    ExpeditionModule,
  ],
  controllers: [ProduitController, DocumentController],
  providers: [ProduitService, DocumentService],

})
export class AppModule {}
