import { Injectable } from '@nestjs/common';
import { Book, BookMini } from '@prisma/client';
import { PrismaService } from '../core/prisma.service';

type BookPromise = Promise<Book | null>;
type BooksPromise = Promise<Book[] | []>;
type BookMiniPromise = Promise<BookMini[] | null>;

@Injectable()
export class BooksService {
  constructor(private prismaClient: PrismaService) {}

  async findOne(id: string): BookPromise {
    const book = await this.prismaClient.book.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    return book;
  }

  async getAllBooks(): BookMiniPromise {
    return await this.prismaClient.bookMini.findMany({});
  }

  async findMany(query: string): BooksPromise {
    return this.prismaClient.book.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { publisher: { contains: query } },
          { author: { contains: query } },
          { authors: { contains: query } },
          { isbn: { contains: query } },
          { categories: { contains: query } },
          { genre: { contains: query } },
          { subGenre: { contains: query } },
        ],
      },
    });
  }
}
