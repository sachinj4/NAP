import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Order } from './dto/order.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(@Inject('FLOW_SERVICE') private client: ClientKafka) {
    console.log('$$$$$$$$$$$$$$', client);
  }
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  confirmOrder(order: Order): { message: string } {
    console.log(JSON.stringify(order));
    this.client
      .emit('admint-test', order)
      .pipe(map((val) => console.log('##############', val)));

    return { message: 'Welcome to api!' };
  }
}
