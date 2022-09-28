import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/order.dto';
import { PaymentDto } from './dto/payment.dto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('api/order')
  order(@Body() orderDto: OrderDto) {
    return this.ordersService.createOrder(orderDto);
  }

  @Post('api/payment')
  paymentIntent(@Body() paymentDto: PaymentDto) {
    return this.ordersService.createPaymentIntent(paymentDto);
  }
}
