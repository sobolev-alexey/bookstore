import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from '../core/prisma.service';
import { Order } from '@prisma/client';

type OrderPromise = Promise<Order | null>;

@Injectable()
export class OrdersService {
  constructor(private prismaClient: PrismaService) {}

  create(createOrderDto: CreateOrderDto): OrderPromise {
    return this.prismaClient.order.create({
      data: createOrderDto,
    });
  }
}
