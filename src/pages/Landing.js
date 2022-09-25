import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/globalState';
import { Bookshelf, Layout, Banner } from '../components';

const Landing = () => {
  const { books } = useContext(AppContext);

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
