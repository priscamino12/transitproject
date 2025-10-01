import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeModule } from './employe/employe.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { PayementModule } from './paiement/payement/payement.module';
import { PaiementModule } from './paiement/paiement.module';
import { PaimentController } from './paiment/paiment.controller';
import { AbonnementModule } from './nest/abonnement/abonnement.module';
import { AbonnementModule } from './abonnement/abonnement.module';
import { SueradminModule } from './sueradmin/sueradmin.module';
import { SuperadminService } from './superadmin/superadmin.service';
import { SuperadminController } from './superadmin/superadmin.controller';
import { SuperadminModule } from './superadmin/superadmin.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    PrismaModule,
    EmployeModule,
    ClientModule,
    AuthModule,
    PayementModule,
    PaiementModule,
    AbonnementModule,
    SueradminModule,
    SuperadminModule,
  ],
  controllers: [AppController, PaimentController, SuperadminController],
  providers: [AppService, SuperadminService],
})
export class AppModule { }
