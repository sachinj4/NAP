import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Customer } from './customer.dto';
import { OrderItem } from './orderItem.dto';

@ApiExtraModels(OrderItem)
export class Order {
  @ApiProperty({
    type: [OrderItem],
  })
  orderItems: OrderItem[];
  @ApiProperty()
  customre: Customer;
  @ApiProperty()
  extraInfo: String;
}
