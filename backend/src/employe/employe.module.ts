import { Module } from '@nestjs/common';
import { EmployeService } from './employe.service';
import { EmployeController } from './employe.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EmployeController],
  providers: [EmployeService, PrismaService],
  exports: [EmployeService],
})
export class EmployeModule {}