import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { CoreModule } from '../core/core.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [CoreModule],
})
export class OrdersModule {}
