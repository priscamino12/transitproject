import { Module } from '@nestjs/common';
import { AdminSystemeService } from './admin-systeme.service';
import { AdminSystemeController } from './admin-systeme.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AdminSystemeController],
  providers: [AdminSystemeService, PrismaService],
  exports: [AdminSystemeService],
})
export class AdminSystemeModule {}