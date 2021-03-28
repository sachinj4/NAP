/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { PartitionAssigners } from '@nestjs/microservices/external/kafka.interface';
import { AppClusterService } from './app/app-cluster.service';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka-service:19092'],
        },
        consumer: {
          groupId: 'flow-consumer',
          partitionAssigners: [PartitionAssigners.roundRobin],
        },
      },
    }
  );
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
