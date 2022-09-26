import React, { useState, useEffect } from 'react';
export const AppContext = React.createContext({});

const GlobalState = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [basket, setBasket] = useState({ items: [], total: 0, count: 0 });
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const booksObjResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/books`);
      const booksObj = await booksObjResponse.json();
      setBooks(booksObj);
      setFilteredBooks(booksObj);
      setLoading(false);
    }

    fetchData();
  }, []); // eslint-disable-line

  return (
    <AppContext.Provider value={{ 
      isLoading,
      refs,
      books, 
      filteredBooks,
      setFilteredBooks,
      setBasket,
      basket,
      setRefs,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default GlobalState;