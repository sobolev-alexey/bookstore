import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BooksModule } from './books/books.module';
import { OrdersModule } from './orders/orders.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [ConfigModule.forRoot(), BooksModule, OrdersModule, CoreModule],
})
export class AppModule {}
