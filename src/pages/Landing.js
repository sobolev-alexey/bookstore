import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/globalState';
import { Bookshelf, Layout, Banner } from '../components';

const Landing = () => {
  const { filteredBooks } = useContext(AppContext);
  const [books, setBooks] = useState(filteredBooks);

  useEffect(() => {
    setBooks(filteredBooks);
  }, [filteredBooks?.length]);

  return (
    <Layout>
      <div className="landing-wrapper">
        <Banner />
        { books?.length ? <Bookshelf books={books} /> : null }
      </div>
    </Layout>
  );
}

export default Landing;
