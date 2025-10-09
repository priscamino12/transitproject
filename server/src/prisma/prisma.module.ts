import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ← permet de l’utiliser partout sans réimporter
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
