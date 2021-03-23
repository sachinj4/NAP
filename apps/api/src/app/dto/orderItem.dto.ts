import { ApiProperty } from '@nestjs/swagger';

export class OrderItem {
  @ApiProperty()
  public product: String;
  @ApiProperty()
  public quantity: Number;
  @ApiProperty()
  public discount: Number;
}
