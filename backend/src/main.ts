import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  const configService = app.get(ConfigService);

  app.use(cookieParser());

  // Optionnel : CORS pour autoriser les cookies côté front
  app.enableCors({
    origin: 'http://localhost:3000', // front Next.js
    credentials: true,               // cookies autorisés
  });
  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);
  console.log(`🚀 Application running on: http://localhost:${port}`);
}
bootstrap();
