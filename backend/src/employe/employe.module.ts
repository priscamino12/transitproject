import { Module } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { EmployeController } from './employe.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeController],
  providers: [EmployeService],
})
export class EmployeModule {}