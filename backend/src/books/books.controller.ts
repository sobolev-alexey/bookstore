import { Controller, Get, Param } from '@nestjs/common';
import { BooksService } from './books.service';

/* We could use a @Controller('books') annotation here to avoid repeating the 'books' prefix for most
 * of the books endpoints. As we have a 'random' prefix we define this prefix at each controller function
 * what gives us more control for the endpoints path. */
@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('api/ping')
  ping() {
    return 'pong';
  }

  @Get('api/books/:id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Get('api/books')
  getAll() {
    return this.booksService.getAllBooks();
  }

  @Get('api/search/:q')
  findMany(@Param('q') query: string) {
    return this.booksService.findMany(query);
  }
}
