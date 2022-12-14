import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { notification } from 'antd';
import callApi from '../utils/callApi';

export const AppContext = React.createContext({});

function GlobalState({ children }) {
  const [isLoading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [basket, setBasket] = useState({ items: [], total: 0, count: 0 });
  const [refs, setRefs] = useState([]);

  useEffect(() => {
    getBooks();
    fetchBasket();
  }, []); // eslint-disable-line

  const errorCallback = (error = null) => {
    notification['error']({
      key: 'api-error',
      duration: 10,
      message: 'Error',
      description:
        error || 'There was an error loading data. Please see console output for details.',
    });
    console.error(error);
  };
  
  // Options API https://swr.vercel.app/docs/options
  const { data, error } = useSWR(`${process.env.REACT_APP_BACKEND_URL}/books`);
  if (error) {
    errorCallback(error);
  }

  useEffect(() => {
    if (data.length) {
      setBooks(data);
      setFilteredBooks(data);
      setLoading(false);
      localStorage.setItem('books', JSON.stringify(data));
    }
  }, [data]); // eslint-disable-line

  const fetchData = async () => {
    const data = await callApi('get', 'books');
    setBooks(data);
    setFilteredBooks(data);
    setLoading(false);
    await localStorage.setItem('books', JSON.stringify(data));
    return data;
  }

  const fetchBasket = async () => {
    if (basket.total === 0) {
      // Try to retrieve basket content from storage
      const basketStored = await localStorage.getItem('basket');
      if (basketStored) {
        setBasket(JSON.parse(basketStored));
      }
    }
  }

  const getBooks = async () => {
    return new Promise(async resolve => {
      if (books.length) {
        resolve(books);
      } else {
        // Try to retrieve books content from storage
        const booksStored = await localStorage.getItem('books');
        if (booksStored) {
          const booksData = JSON.parse(booksStored);
          setBooks(booksData);
          setFilteredBooks(booksData);
          resolve(booksData);
        } else {
          const booksData = await fetchData();
          resolve(booksData);
        }
      }
    });
  }

  const updateBasket = async (newBasket = { items: [], total: 0, count: 0 }) => {
    setBasket(newBasket);
    await localStorage.setItem('basket', JSON.stringify(newBasket));
  }

  return (
    <AppContext.Provider value={{ 
      isLoading,
      refs,
      books, 
      filteredBooks,
      setFilteredBooks,
      updateBasket,
      basket,
      setRefs,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export default GlobalState;