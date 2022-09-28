import { BookMiniDto } from "src/books/dto/book-mini.dto";

export const BookDtoStub = (): BookMiniDto => {
  return {
    author: "Goswami, Jaideva",
    averageRating: 3.5,
    country: "DE",
    cover: "http://books.google.com/books/content?id=zN2JJPeUYfcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    currency: "EUR",
    genre: "tech",
    listPrice: 11.99,
    ratingsCount: 7,
    title: "Fundamentals of Wavelets",
  };
};
