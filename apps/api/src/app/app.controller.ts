import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { Order } from './dto/order.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  confirmOrder(@Body() order: Order) {
    return this.appService.confirmOrder(order);
  }
}
