import React, { useState, useEffect } from 'react';
export const AppContext = React.createContext({});

const GlobalState = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const booksObjResponse = await fetch(process.env.REACT_APP_BACKEND_URL);
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
      books, 
      filteredBooks,
      setFilteredBooks,
      setCartItems,
      cartItems,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default GlobalState;