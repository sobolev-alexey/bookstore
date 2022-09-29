import { Test, TestingModule } from '@nestjs/testing';
import * as randomstring from 'randomstring';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CoreModule } from '../core/core.module';
import { OrderDtoStub } from "../../test/stubs/order.dto.stub";
import { PaymentDtoStub } from "../../test/stubs/payment.dto.stub";
import { OrderDto } from "./dto/order.dto";

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("paymentIntent", () => {
    it("should create paymentIntent", async () => {
      const paymentIntent = await controller.paymentIntent(PaymentDtoStub());
      expect(Object.prototype.toString.call(paymentIntent)).toBe('[object Object]');
      expect(paymentIntent?.clientSecret).toBeDefined();
      expect(paymentIntent?.clientSecret).toBeTruthy();
    });
  });
  describe("order", () => {
    it("should create order", async () => {
      const ordersBefore = await service.getAllOrders();
      const order = OrderDtoStub();
      order.orderId = 'pi_' + randomstring.generate(24) + '_test';
      await controller.order(order);
      const ordersAfter = await service.getAllOrders();
      const orderLast: OrderDto = ordersAfter?.[ordersAfter.length - 1];
      expect(ordersAfter?.length - ordersBefore?.length).toBe(1);
      expect(orderLast.orderId).toBe(order.orderId);
      expect(orderLast.bookIds).toBe(order.bookIds);
    });
  });
});
