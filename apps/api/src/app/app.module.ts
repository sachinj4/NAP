import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'FLOW_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'flow',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'flow-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
