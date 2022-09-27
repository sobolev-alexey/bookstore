import React, { useContext } from 'react';
import { Spin } from 'antd';
import { AppContext } from '../context/globalState';
import { Bookshelf, Layout, Banner } from '../components';

const Landing = () => {
  const { filteredBooks, books } = useContext(AppContext);

  return (
    <Layout>
      <div className="landing-wrapper">
        <Banner />
        { filteredBooks?.length ? <Bookshelf books={filteredBooks} /> : 
          (books?.length 
            ? <h3 className="not-found">Nothing found</h3> 
            : <Spin size="large" />)
        }
      </div>
    </Layout>
  );
}

export default Landing;
