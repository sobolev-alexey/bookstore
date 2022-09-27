import React, { useState, useEffect } from 'react';
import callApi from '../utils/callApi';

export const AppContext = React.createContext({});

const GlobalState = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [basket, setBasket] = useState({ items: [], total: 0, count: 0 });
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line

  const fetchData = async () => {
    const data = await callApi('get', 'books');
    setBooks(data);
    setFilteredBooks(data);
    setLoading(false);
  }

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