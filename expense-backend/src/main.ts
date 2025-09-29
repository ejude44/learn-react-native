import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  try {
    console.log(`Starting app with NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`DATABASE_URL exists: ${!!process.env.DATABASE_URL}`);

    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.setGlobalPrefix('api');

    app.enableCors({
      origin: 'true',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    const port = process.env.PORT || 8080;
    console.log(`init to be called`);
    await app.init();
    console.log(`init called`);

    await app.listen(port, '0.0.0.0');
    console.log(`Application is running on port ${port}`);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}
bootstrap();
