export const fetchBooks = async () => {
  const booksObjResponse = await fetch(process.env.REACT_APP_BACKEND_URL);
  return await booksObjResponse.json();
};

export const fetchCovers = async booksObj => {
  const bookDataArr = [];
  const bookDataFromStorage = await localStorage.getItem('bookData');
  if (bookDataFromStorage) {
    return JSON.parse(bookDataFromStorage);
  } else {
    for await (const book of booksObj) {
      const bookDataResponse = await getBookData(book.Title, book.Author);
      const bookData = bookDataResponse?.items?.[0]?.volumeInfo;
      const saleData = bookDataResponse?.items?.[0]?.saleInfo;
      const description = bookData?.description.slice(0, 300) + '...';
      const isbn = bookData?.industryIdentifiers?.find(
        obj => obj?.type === 'ISBN_13'
      )?.identifier;
      const cover = bookData?.imageLinks?.thumbnail;
      const averageRating = bookData?.averageRating;
      const ratingsCount = bookData?.ratingsCount;
      const listPrice = saleData?.listPrice;
      const country = saleData?.country;
      bookDataArr.push({
        title: book?.Title,
        author: book?.Author,
        genre: book?.Genre,
        description,
        isbn,
        cover,
        averageRating,
        ratingsCount,
        listPrice,
        country,
      });
    }
    await localStorage.setItem('bookData', JSON.stringify(bookDataArr));
    return bookDataArr;
  }
};

const getBookData = async (title, author) => {
  const url = `${process.env.REACT_APP_GOOGLE_BOOK_API_URL}${encodeURIComponent(
    `${title}, ${author}`
  )}${process.env.REACT_APP_GOOGLE_BOOK_API_PARAMS}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  try {
    const googleResponse = await axios.get(url);
    return googleResponse.data;
  } catch (error) {
    console.log(error);
  }
};
