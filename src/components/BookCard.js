import React, { useContext } from 'react';
import { Image, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/globalState';
import missingThumbnail from "../assets/missingThumbnail.png";
import { getPriceLabel } from '../utils/helpers';

function BookCard({ book }) {
  const { cartItems, setCartItems } = useContext(AppContext);

  const addBook = book => {
    setCartItems([...cartItems, book]);
  }

  return (
    <div
      key={`${book?.ID}-${book?.ISBN}`}
      className="book-item-wrapper"
    >
        <Link to={`/book/${book?.ID}`}>
          <Image 
            className="thumbnail"
            src={book?.Cover || missingThumbnail} 
            alt={book?.Title} 
            width={90}
            height={140}
            preview={false}
            placeholder
            fallback={missingThumbnail}
          />
        </Link>
        <div className="item-info">
          <Link to={`/book/${book?.ID}`}>
            <h4 className="title">
              {book?.Title}
            </h4>
          </Link>
          <Link to={`/book/${book?.ID}`}>
            <p className="author">
              {book?.Author || <>&nbsp;</>}
            </p>
          </Link>
        </div>
        <div className="rating">
          <Rate allowHalf disabled defaultValue={book?.AverageRating || 0} />&nbsp;&nbsp;
          ({book?.RatingsCount || 0})
        </div>
        <div className="price">
          { 
            book?.ListPrice?.amount 
            ? getPriceLabel(book?.ListPrice?.amount, book?.Country, book?.ListPrice?.currencyCode) 
            : <p>Not available</p>
          }
        </div>
        <div className="actions">
          <button 
            className="primary" 
            onClick={() => addBook(book)}
            disabled={!book?.ListPrice?.amount}
          >
            Add to basket
          </button>
        </div>
    </div>
  );
}

export default React.memo(BookCard);
