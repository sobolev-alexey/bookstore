import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { CoreModule } from '../core/core.module';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [CoreModule],
})
export class BooksModule {}
