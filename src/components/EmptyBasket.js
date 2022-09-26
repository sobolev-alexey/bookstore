import React from 'react';
import { Link } from 'react-router-dom'; 

const EmptyBasket = () => {
  return (
    <>
      <div className="card cart-empty-content-top">
        <p>Your basket is empty.</p>
      </div>
      <div className="card cart-empty-content-bottom">
        <h3>Need some help finding a book?</h3>
        <p>
          We sell over 20 million titles at unbeatable prices with free delivery worldwide. Explore our bestsellers to find your next favourite book!
        </p>
        <Link to="/">
          <button className="primary">Browse Bestsellers</button>
        </Link>
        <p>
          And don't forget we have <b>Free delivery worldwide on every book</b>
        </p>
      </div>
    </>
  );
};

export default EmptyBasket;
