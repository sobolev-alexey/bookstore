import React, { useContext } from 'react';
import { Image, Rate } from 'antd';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/globalState';
import missingThumbnail from "../../assets/common/missingThumbnail.png";
import { getPriceLabel } from '../../utils/helpers';

function BookCard({ book }) {
  const { basket, updateBasket } = useContext(AppContext);

  const addBook = book => {
    const myBasket = { ...basket };
    myBasket.total += book?.listPrice;
    myBasket.count += 1;

    const similarBook = myBasket?.items?.find(item => book.id === item.id);
    if (similarBook) {
      similarBook.count += 1; 
    } else {
      myBasket?.items.push({
        ...book,
        count: 1
      });
    }
    updateBasket(myBasket);
  }

  return (
    <div
      key={`${book?.id}-${book?.isbn}`}
      className="book-item-wrapper"
    >
        <Link to={`/book/${book?.id}`}>
          <Image 
            className="thumbnail"
            src={book?.cover || missingThumbnail} 
            alt={book?.title} 
            width={90}
            height={140}
            preview={false}
            placeholder
            fallback={missingThumbnail}
          />
        </Link>
        <div className="item-info">
          <Link to={`/book/${book?.id}`}>
            <h4 className="title">
              {book?.title}
            </h4>
          </Link>
          <Link to={`/book/${book?.id}`}>
            <p className="author">
              {book?.author || <>&nbsp;</>}
            </p>
          </Link>
        </div>
        <div className="rating">
          <Rate allowHalf disabled value={book?.averageRating || 0} defaultValue={book?.averageRating || 0} />&nbsp;&nbsp;
          ({book?.ratingsCount || 0})
        </div>
        <div className="price">
          { 
            book?.listPrice 
            ? getPriceLabel(book?.listPrice, book?.country, book?.currency) 
            : <p>Not available</p>
          }
        </div>
        <div className="actions">
          <button 
            className="primary" 
            onClick={() => addBook(book)}
            disabled={!book?.listPrice}
          >
            Add to basket
          </button>
        </div>
    </div>
  );
}

export default React.memo(BookCard);
