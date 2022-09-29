import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CoreModule } from '../core/core.module';
import { BookDtoStub } from "../../test/stubs/book.dto.stub";
import { BooksDtoStub } from "../../test/stubs/books.dto.stub";

describe('BooksController', () => {
  let controller: BooksController;
  let bookId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("getBooks", () => {
    it("should return an array with book objects", async () => {
      const books = await controller.getAll();
      const bookFirst = books?.[0];
      const bookLast = books?.[books.length - 1];
      expect(books.length === 211 && Array.isArray(books)).toBeTruthy();
      expect(bookFirst.title).toBe('Fundamentals of Wavelets');
      expect(bookLast.title === 'A Christmas Carol' || bookLast.title === 'Christmas Carol, A').toBeTruthy();
      bookId = books?.[0].id;
    });
  });
  describe("getBook", () => {
    it("should return one book by ID", async () => {
      const book = await controller.findOne(bookId);
      expect(book.title).toBe('Fundamentals of Wavelets');
      expect(book.id).toBe(bookId);
      expect(book.title).toBe(BookDtoStub().title);
    });
    it("should return null if not found", async () => {
      const book = await controller.findOne('none');
      expect(book).toBeNull();
    });
  });

  describe("searchBook", () => {
    it("should return multiple results", async () => {
      const query = 'rowling';
      const results = await controller.findMany(query);
      const bookFirst = results?.[0];
      const bookLast = results?.[results.length - 1];
      expect(results.length === 2 && Array.isArray(results)).toBeTruthy();
      expect(bookFirst.title).toBe(BooksDtoStub()[0].title);
      expect(bookLast.title).toBe(BooksDtoStub()[1].title);
      expect(bookFirst.author).toBe(BooksDtoStub()[0].author);
      expect(bookLast.author).toBe(BooksDtoStub()[1].author);
    });
    it("should return empty array", async () => {
      const query = 'rrrrrrr';
      const results = await controller.findMany(query);
      expect(results.length).toBe(0);
    });
  });
});
