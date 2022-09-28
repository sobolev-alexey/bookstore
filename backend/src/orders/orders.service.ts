import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { PaymentDto } from './dto/payment.dto';
import { PrismaService } from '../core/prisma.service';
import { Order } from '@prisma/client';

type OrderPromise = Promise<Order | null>;
type OrdersPromise = Promise<Order[] | []>;
type PaymentPromise = Promise<{ clientSecret: string | null }>;

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
  appInfo: {
    name: "bookstore",
    version: "1.2.1",
  }
});

@Injectable()
export class OrdersService {
  constructor(private prismaClient: PrismaService) {}

  async createPaymentIntent(paymentDto: PaymentDto): PaymentPromise {
    try {
      const { amount, currency } = paymentDto;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number(amount) * 100),
        currency,
        metadata: {integration_check: 'accept_a_payment'},
      });
      return { clientSecret: paymentIntent?.client_secret };
    } catch (error) { 
      console.error(error);
      return { clientSecret: null };
    }
  }

  async createOrder(orderDto: OrderDto): OrderPromise {
    return this.prismaClient.order.create({
      data: orderDto,
    });
  }

  async getAllOrders(): OrdersPromise {
    return await this.prismaClient.order.findMany({});
  }
}
