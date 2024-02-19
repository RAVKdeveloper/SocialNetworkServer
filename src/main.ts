import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe()),
    app.use(cookieParser()),
    app.useStaticAssets(path.join(__dirname, '../uploads/avatar')),
    app.useStaticAssets(path.join(__dirname, '../uploads/userPhoto')),
    app.useStaticAssets(path.join(__dirname, '../uploads/userClips')),
    app.useStaticAssets(path.join(__dirname, '../uploads/WallMedia')),
    app.useStaticAssets(path.join(__dirname, '../uploads/WallMedia/comments')),
    await app.listen(5000);
}

bootstrap();
