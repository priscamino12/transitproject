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



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    PrismaModule,
    EmployeModule,
    ClientModule,
    AuthModule,
    EntrepriseModule,
    AdminSystemeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
