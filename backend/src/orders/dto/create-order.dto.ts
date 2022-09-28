export class CreateOrderDto {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state?: string;
  postcode: string;
  orderId: string;
  email: string;
  cardholder: string;
  bookIds: string
  amount: number;
}
