import { Database } from '@app/database';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
import { AppModule } from './app.module';

config();
Database.setConnectUri(process.env.MONGODB_URI || 'mongodb://localhost:27017/noin-coraebang');

async function bootstrap() {
  await Database.getClient().connect();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const options = new DocumentBuilder()
    .setTitle('Noin Coraebang API')
    .setDescription('Noin Coraebang API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap().then();
