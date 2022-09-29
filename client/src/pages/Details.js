import React, { useContext, useState, useEffect } from 'react';
import { Image, Rate, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/globalState';
import { Layout, BookCarousel } from '../components';
import missingImage from '../assets/common/empty.png';
import rocketImage from '../assets/details/rocket_black.svg';
import checkImage from '../assets/details/circle-check-regular.svg';
import { getPriceLabel } from '../utils/helpers';
import callApi from '../utils/callApi';

const Details = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { books, basket, updateBasket } = useContext(AppContext);
  const [book, setBook] = useState({});
  const [randomBookIndex, setRandomBookIndex] = useState(0);

  useEffect(() => {
    async function getBook() {
      const backendResponse = await callApi('get', `books/${bookId}`);
      if (backendResponse === 'Book not found') {
        navigate('/');
      } else {
        setBook(backendResponse);
      }
    }

    getBook();
    setRandomBookIndex(Math.floor(Math.random() * books?.length - 100));
  }, [bookId]);

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
    <Layout>
      {
        !book || !book?.id 
          ? <Spin size="large" /> 
          : (
              <div className="details-page-wrapper">
                <div className="card main-details-wrapper">
                  <div className="book-details-wrapper">
                    <div className="book-details-image-wrapper">
                      <Image 
                        className="book-image"
                        src={book?.cover} 
                        alt={book?.title} 
                        width={260}
                        preview={false}
                        fallback={missingImage}
                      />
                    </div>
                    <div className="book-details-description-wrapper">
                      <h2 className="title">{book?.title}</h2>
                      <div className="rating">
                        <Rate allowHalf disabled value={book?.averageRating} defaultValue={book?.averageRating} />&nbsp;&nbsp;
                        ({book?.ratingsCount || 0})
                      </div>
                      <p className="author">By (author)
                        {`  ${book?.authors || book?.author}`}
                      </p>
                      <br />
                      <p className="description">{book?.description}</p>
                    </div>
                  </div>
                  <div className="price-details-wrapper">
                    <h1 className="price">          
                      { 
                        book?.listPrice 
                        ? getPriceLabel(book?.listPrice, book?.country, book?.currency) 
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
                      disabled={!book?.listPrice}
                    >
                      Add to basket
                    </button>
                  </div>
                </div>
                <div className="card additional-details-wrapper">
                  <h3>Product details</h3>
                  <div className="product-details-wrapper">
                      <span><p className="bold">Format:</p><p>Paperback | {book?.pageCount} pages</p></span>
                      <span><p className="bold">Publication date:</p><p>{book?.publishedDate}</p></span>
                      <span><p className="bold">Publisher:</p><p>{book?.publisher}</p></span>
                      <span><p className="bold">Language:</p><p>{book?.country}</p></span>
                      <span><p className="bold">ISBN13:</p><p>{book?.isbn}</p></span>
                      <span><p className="bold">Category:</p><p>{book?.categories || book?.genre}</p></span>
                  </div>
                </div>
                <div className="card suggestions-wrapper book-carousel-wrapper similar">
                  <h3>People who bought this also bought</h3>
                  <BookCarousel 
                    books={books
                      ?.filter(item => item?.listPrice)
                      ?.sort((a, b) => b?.ratingsCount - a?.ratingsCount)
                      ?.sort((a, b) => b?.averageRating - a?.averageRating)
                      ?.slice(randomBookIndex, randomBookIndex + 35)
                    } 
                  />
                </div>
                <div className="card suggestions-wrapper book-carousel-wrapper bestselling">
                  <h3>Bestsellers in {book?.categories}</h3>
                  <BookCarousel 
                    books={books
                      ?.filter(item => item?.listPrice)
                      ?.sort((a, b) => b?.ratingsCount - a?.ratingsCount)
                      ?.sort((a, b) => b?.averageRating - a?.averageRating)
                      ?.filter(item => item?.genre === book?.genre)
                    } 
                  />
                </div>
              </div>
            )
      }
    </Layout>
  );
}

export default Details;
