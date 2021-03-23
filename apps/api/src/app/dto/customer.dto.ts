import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @ApiProperty()
  public name: String;
  @ApiProperty()
  public billingAdress: String;
}
