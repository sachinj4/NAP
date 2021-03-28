/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppClusterService } from './app/app-cluster.service';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const config = new DocumentBuilder()
    .setTitle('NAT')
    .setDescription('Shoping Cartnx server')
    .setVersion('1.0')
    .addTag('shoping')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
