import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Order } from './dto/order.dto';

const { Engine } = require('bpmn-engine');
const fs = require('fs');
const { EventEmitter } = require('events');

@Injectable()
export class AppService {
  constructor(@Inject('FLOW_SERVICE') private client: ClientKafka) {}
  getData(): { message: string } {
    return { message: 'Welcome to api!' };
  }

  confirmOrder(order: Order): { message: string } {
    const variables = {
      price: 5,
    };
    const engine = Engine({
      name: 'mother of all',
      source: fs.readFileSync('D:/work/NAP/apps/api/src/resources/first.bpmn'),
    });

    engine.execute(
      {
        variables,
        services: {
          multiplyAndDelay: (scope, callback) => {
            console.log(
              'multiplyAndDelay , input',
              scope.environment.variables.price
            );
            console.log('multiplyAndDelay , test', callback);
            scope.environment.variables.price1 = 25;
            return callback(null, 25);
          },
          addAndlog: (scope, callback) => {
            console.log(
              'addAndlog , input @@@@@@@@@@@@@@@',
              scope.environment.variables
            );
            console.log('addAndlog , Output#####', scope.environment.output);
            console.log('addAndlog , test', callback);
            scope.environment.variables.price2 = 35;
            return callback(null, 35);
          },
        },
        extensions: {
          saveToEnvironmentOutput(activity, { environment }) {
            activity.on('end', (api) => {
              console.log('### @@@@@@@@@@@', api);
              environment.output[api.id] = api.content.output;
            });
          },
        },
      },
      (err, engineApi) => {
        if (err) throw err;
        console.log('completed');
      }
    );

    engine.once('end', (execution) => {
      console.log('#######################', execution.environment.output);
    });
    return { message: 'Welcome to api!' };

    // console.log('@@@@@@@@@@@@@', JSON.stringify(order));
    // this.client.emit('order', {
    //   value: JSON.stringify(order),
    //   partition: 1,
    //   key: 'entity1',
    // });
    // this.client.emit('order', {
    //   value: JSON.stringify(order),
    //   partition: 1,
    //   key: 'entity1',
    // });
    // this.client.emit('order', {
    //   value: JSON.stringify(order),
    //   partition: 1,
    //   key: 'entity2',
    // });
    // this.client.emit('order', {
    //   value: JSON.stringify(order),
    //   partition: 0,
    //   key: 'entity3',
    // });
  }
}
