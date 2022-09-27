import React, { useContext, useState, useEffect } from 'react';
import { Image, Rate } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/globalState';
import { Layout, BookCarousel } from '../components';
import missingImage from '../assets/common/empty.png';
import rocketImage from '../assets/details/rocket_black.svg';
import checkImage from '../assets/details/circle-check-regular.svg';
import { getPriceLabel } from '../utils/helpers';

const Details = () => {
  const { bookId } = useParams();
  const { books, basket, setBasket } = useContext(AppContext);
  const [book, setBook] = useState({});
  const [randomBookIndex, setRandomBookIndex] = useState(0);

  useEffect(() => {
    async function getBook() {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`);
      setBook(response?.data);
    }

    getBook();
    setRandomBookIndex(Math.floor(Math.random() * books?.length - 20));
  }, [bookId]);

  const addBook = book => {
    const myBasket = { ...basket };
    myBasket.total += book?.ListPrice?.amount;
    myBasket.count += 1;

    const similarBook = myBasket?.items?.find(item => book.ID === item.ID);
    if (similarBook) {
      similarBook.count += 1; 
    } else {
      myBasket?.items.push({
        ...book,
        count: 1
      });
    }
    setBasket(myBasket);
  }

  if (!book) return null;
  
  return (
    <Layout>
      <div className="details-page-wrapper">
        <div className="card main-details-wrapper">
          <div className="book-details-wrapper">
            <div className="book-details-image-wrapper">
              <Image 
                className="book-image"
                src={book?.Cover} 
                alt={book?.Title} 
                width={260}
                preview={false}
                fallback={missingImage}
              />
            </div>
            <div className="book-details-description-wrapper">
              <h2 className="title">{book?.Title}</h2>
              <div className="rating">
                <Rate allowHalf disabled value={book?.AverageRating} defaultValue={book?.AverageRating} />&nbsp;&nbsp;
                ({book?.RatingsCount || 0})
              </div>
              <p className="author">By (author)
                {`  ${book?.Authors?.join(', ')}`}
              </p>
              <br />
              <p className="description">{book?.Description}</p>
            </div>
          </div>
          <div className="price-details-wrapper">
            <h1 className="price">          
              { 
                book?.ListPrice?.amount 
                ? getPriceLabel(book?.ListPrice?.amount, book?.Country, book?.ListPrice?.currencyCode) 
                : <>Not available</>
              }
            </h1>
            <div className="marketing-wrapper">
              <div className="marketing bold">
                <img src={rocketImage} alt="" className="icon"/>&nbsp;
                <p>Free delivery worldwide</p>
              </div>
              <br />
              <div className="marketing bold">
                <img src={checkImage} alt="" className="icon"/>&nbsp;
                <p>Price includes VAT/import taxes for EU delivery</p>
              </div>
              <br />
              <div className="marketing">
                <img src={checkImage} alt="" className="icon"/>&nbsp;
                <p>Available. Expected delivery to Germany in 13-18 business days.</p>
              </div>
            </div>
            <button 
              className="primary long"
              onClick={() => addBook(book)}
              disabled={!book?.ListPrice?.amount}
            >
              Add to basket
            </button>
          </div>
        </div>
        <div className="card additional-details-wrapper">
          <h3>Product details</h3>
          <div className="product-details-wrapper">
              <span><p className="bold">Format:</p><p>Paperback | {book?.PageCount} pages</p></span>
              <span><p className="bold">Publication date:</p><p>{book?.PublishedDate}</p></span>
              <span><p className="bold">Publisher:</p><p>{book?.Publisher}</p></span>
              <span><p className="bold">Language:</p><p>{book?.Country}</p></span>
              <span><p className="bold">ISBN13:</p><p>{book?.ISBN}</p></span>
              <span><p className="bold">Category:</p><p>{book?.Categories?.join(', ')}</p></span>
          </div>
        </div>
        <div className="card suggestions-wrapper book-carousel-wrapper">
          <h3>People who bought this also bought</h3>
          <BookCarousel books={books?.slice(randomBookIndex, randomBookIndex + 14)} />
        </div>
        <div className="card suggestions-wrapper book-carousel-wrapper">
          <h3>Bestsellers in {book?.Categories?.[0]}</h3>
          <BookCarousel books={books?.filter(item => item?.Genre === book?.Genre)} />
        </div>
      </div>
    </Layout>
  );
}

export default Details;
