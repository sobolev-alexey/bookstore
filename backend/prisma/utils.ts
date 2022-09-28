import axios from 'axios';
import fs from 'fs';
import * as books from '../books.json';

export const fetchCovers = async (booksObj) => {
  const bookDataArr = [];
  try {
    try {
      if (books?.length) {
        return books;
      }
    } catch (e) {} // if no file, start fetching

    let counter = 0;
    for await (const book of booksObj) {
      counter++;
      const bookDataResponse = await getBookData(book.Title, book.Author);
      const bookData = bookDataResponse?.items?.[0]?.volumeInfo;
      const saleData = bookDataResponse?.items?.[0]?.saleInfo;
      const description = bookData?.description;
      const authors = bookData?.authors?.join(', ');
      const publisher = bookData?.publisher;
      const publishedDate = bookData?.publishedDate;
      const pageCount = bookData?.pageCount;
      const categories = bookData?.categories?.join(', ');
      const title = bookData?.title;
      const isbn = bookData?.industryIdentifiers?.find(
        (obj) => obj?.type === 'ISBN_13',
      )?.identifier;
      const cover = bookData?.imageLinks?.thumbnail;
      const averageRating = bookData?.averageRating;
      const ratingsCount = bookData?.ratingsCount;
      const listPrice = saleData?.listPrice?.amount;
      const currency = saleData?.listPrice?.currencyCode;
      const country = saleData?.country;

      bookDataArr.push({
        author: book?.Author || '',
        genre: book?.Genre || '',
        subGenre: book?.SubGenre || '',
        height: book?.Height,
        authors,
        description,
        isbn,
        cover,
        averageRating,
        ratingsCount,
        listPrice,
        currency,
        country,
        publisher,
        publishedDate,
        pageCount,
        categories,
        title,
      });
      console.log('Fetched', counter, book.Title);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    try {
      fs.writeFileSync(
        '../books.json',
        JSON.stringify(bookDataArr, undefined, '\t'),
      );
    } catch (error) {
      console.error(error);
    }
    return bookDataArr;
  } catch (error) {
    console.error(error);
  }
};

const getBookData = async (title, author) => {
  const url = `${process.env.GOOGLE_BOOK_API_URL}${encodeURIComponent(
    `${title}, ${author}`,
  )}${process.env.GOOGLE_BOOK_API_PARAMS}&key=${process.env.GOOGLE_API_KEY}`;
  try {
    const googleResponse = await axios.get(url);
    return googleResponse.data;
  } catch (error) {
    console.error(error);
  }
};
