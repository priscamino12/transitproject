import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT')|| 3001;
  const FRONTEND_URL = configService.get<string>('FRONTEND_URL');
  const HOST = configService.get<string>('HOST');


  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: FRONTEND_URL, 
    credentials: true, 
  });
  await app.listen(PORT); // Port du service Auth
  console.log(`🚀 Application running on: ${HOST}:${PORT}`);
}
bootstrap();
