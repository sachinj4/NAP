import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('order')
  async handleUserCreated(data: Record<string, unknown>) {
    console.log('Event Received @@@@@@ ', data);
  }
}
