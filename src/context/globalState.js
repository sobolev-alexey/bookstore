import React, { useState, useEffect } from 'react';
import { fetchBooks, fetchCovers } from '../utils/booksHelper';
export const AppContext = React.createContext({});

const GlobalState = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const booksObj = await fetchBooks();
      setLoading(false);
      const bookDataArr = booksObj?.map(book => ({
        title: book?.Title,
        author: book?.Author,
        genre: book?.Genre,
      }));
      setBooks(bookDataArr);
      const bookData = await fetchCovers(booksObj.slice(0, 5));
      setBooks(bookData);
    }

    fetchData();
  }, []); // eslint-disable-line

  return (
    <AppContext.Provider value={{ 
      isLoading,
      books
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default GlobalState;