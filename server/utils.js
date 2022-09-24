const fs = require('fs');
const axios = require('axios');
const randomstring = require('randomstring');

exports.fetchBooks = async () => {
  const booksObjResponse = await fetch(process.env.REACT_APP_BACKEND_URL);
  return await booksObjResponse.json();
};

exports.fetchCovers = async booksObj => {
  const bookDataArr = [];
  const bookDataMiniArr = [];
  try {
    try {
      const bookDataFromStorage = fs.readFileSync('./books_mini.json');
      if (bookDataFromStorage) {
        return JSON.parse(bookDataFromStorage);
      }
    } catch (e) {} // if no file, start fetching

    let counter = 0;
    for await (const book of booksObj) {
      counter++;
      const bookDataResponse = await getBookData(book.Title, book.Author);
      const bookData = bookDataResponse?.items?.[0]?.volumeInfo;
      const saleData = bookDataResponse?.items?.[0]?.saleInfo;
      const Description = bookData?.description;
      const Authors = bookData?.authors;
      const Publisher = bookData?.publisher;
      const PublishedDate = bookData?.publishedDate;
      const PageCount = bookData?.pageCount;
      const Categories = bookData?.categories;
      const Title = bookData?.title;
      const ISBN = bookData?.industryIdentifiers?.find(
        obj => obj?.type === 'ISBN_13'
      )?.identifier;
      const Cover = bookData?.imageLinks?.thumbnail;
      const AverageRating = bookData?.averageRating;
      const RatingsCount = bookData?.ratingsCount;
      const ListPrice = saleData?.listPrice;
      const Country = saleData?.country;
      const ID = randomstring.generate(7);

      bookDataArr.push({
        ...book,
        Authors,
        Description,
        ISBN,
        Cover,
        AverageRating,
        RatingsCount,
        ListPrice,
        Country,
        Publisher,
        PublishedDate,
        PageCount,
        Categories,
        Title,
        ID
      });
      bookDataMiniArr.push({
        Author: Authors?.[0],
        Genre: book?.Genre,
        Cover,
        AverageRating,
        RatingsCount,
        ListPrice,
        Title,
        ID
      });
      console.log('Fetched', counter, book.Title)
      await new Promise(resolve => setTimeout(resolve, 60));
    }
    try {
      fs.writeFileSync('./books.json', JSON.stringify(bookDataArr, undefined, "\t"));
      fs.writeFileSync('./books_mini.json', JSON.stringify(bookDataMiniArr, undefined, "\t"));
    } catch (error) {
      console.error(error);
    }
    return bookDataMiniArr;
  } catch (error) { 
    console.error(error);
  }
};

const getBookData = async (title, author) => {
  const url = `${process.env.GOOGLE_BOOK_API_URL}${encodeURIComponent(
    `${title}, ${author}`
  )}${process.env.GOOGLE_BOOK_API_PARAMS}&key=${process.env.GOOGLE_API_KEY}`;
  try {
    const googleResponse = await axios.get(url);
    return googleResponse.data;
  } catch (error) {
    console.error(error);
  }
};

exports.findBooks = async searchQuery => {
  try {
    const bookDataFromStorage = fs.readFileSync('./books.json');
    if (bookDataFromStorage) {
      return JSON.parse(bookDataFromStorage).filter(book =>
           book?.Title?.toLowerCase().includes(searchQuery?.toLowerCase()) 
        || book?.Description?.toLowerCase().includes(searchQuery?.toLowerCase()) 
        || book?.Publisher?.toLowerCase().includes(searchQuery?.toLowerCase()) 
        || book?.Author?.toLowerCase().includes(searchQuery?.toLowerCase()) 
        || book?.Authors?.[0]?.toLowerCase().includes(searchQuery?.toLowerCase()) 
        || book?.ISBN?.toLowerCase().includes(searchQuery?.toLowerCase()) 
      );
    }
  } catch (error) { 
    console.error(error);
    return [];
  }
};
