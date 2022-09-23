import React, { useState, useEffect } from 'react';

export const AppContext = React.createContext({});

const GlobalState = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState({});

  useEffect(() => {
    fetchBooks();
  }, []); // eslint-disable-line

  const fetchBooks = async () => {
    const booksObjResponse = await fetch('http://localhost:3000/api/books');
    const booksObj = await booksObjResponse.json();
    setBooks(booksObj);
    setLoading(false);
  };

  return (
    <AppContext.Provider value={{ 
      isLoading,
      books,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default GlobalState;