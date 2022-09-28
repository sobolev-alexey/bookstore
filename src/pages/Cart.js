import React, { useContext, useState, useEffect } from 'react';
import { Image, Rate, Select } from 'antd';
import { Link } from 'react-router-dom'; 
import { AppContext } from '../context/globalState';
import { Layout, BookCarousel, EmptyBasket } from '../components';
import missingImage from '../assets/common/empty.png';
import basketImage from '../assets/cart/basket-shopping-solid-black.svg';
import paypalImage from '../assets/cart/paypal_button.jpg';
import cardsImage from '../assets/cart/cards.jpg';
import { getPriceLabel } from '../utils/helpers';

const Cart = () => {
  const { books, basket, updateBasket } = useContext(AppContext);
  const [randomBookIndex, setRandomBookIndex] = useState(0);
  const [priceLabel, setPriceLabel] = useState();

  useEffect(() => {
    setPriceLabel(getPriceLabel(
      basket?.total, 
      basket.items?.[0]?.Country, 
      basket.items?.[0]?.ListPrice?.currencyCode
    ))
    setRandomBookIndex(Math.floor(Math.random() * books?.length - 20));
  }, [basket?.total]);

  const removeBook = book => {
    const myBasket = { ...basket };
    const index = myBasket?.items.findIndex(item => item.ID === book.ID);
    const item = myBasket?.items?.[index];
    
    if (index >= 0 && item) {
      myBasket?.items.splice(index, 1);
      // Re-calculate total
      const total = myBasket?.items?.reduce((total, item) => total + item.count * item.ListPrice?.amount, 0);
      const count = myBasket?.items?.reduce((total, item) => total + item.count, 0);
      myBasket.total = total;
      myBasket.count = count;
    }

    updateBasket(myBasket);
  }

  const changeQty = (book, qty) => {
    const myBasket = { ...basket };
    const index = myBasket?.items.findIndex(item => item.ID === book.ID);
    const item = myBasket?.items?.[index];
    
    if (index >= 0 && item) {
      item.count = qty; 
    }

    // Re-calculate total
    const total = myBasket?.items?.reduce((total, item) => total + item.count * item.ListPrice?.amount, 0);
    const count = myBasket?.items?.reduce((total, item) => total + item.count, 0);
    myBasket.total = total;
    myBasket.count = count;

    updateBasket(myBasket);
  }

  return (
    <Layout>
      <div className="cart-page-wrapper">
        <h1>Your basket</h1>
        {
          basket.count === 0 ? <EmptyBasket /> : (
            <>
              <div className="card cart-top-content-wrapper">
                <div className="cart-top-content">
                  <span className="cart-total">
                    <img src={basketImage} alt="" className="icon"/>&nbsp;
                    <p>
                      You have {basket.count} items for a total of <b>{ priceLabel }</b> in your basket.
                    </p>
                  </span>
                  <span className="action-buttons">
                    <img src={paypalImage} alt="Check out with PayPal" className="paypal"/>
                    &nbsp;&nbsp;&nbsp;&nbsp; - Or -  &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/checkout">
                      <button className="primary">Checkout</button>
                    </Link>
                  </span>
                </div>
                <p className="cart-bottom-content">
                  In placing your order, you are confirming that you have read and agree to our <u>Terms and Conditions</u>. Please also see our <u>Privacy Policy</u> and our <u>Cookies Policy</u>.
                </p>
              </div>

              <div className="card cart-main-details-wrapper">
                <h3>Shopping basket details</h3>
                {
                  basket.items?.map(book => (
                    <div className="book-details-wrapper" key={book.ID}>
                      <div className="book-details-image-wrapper">
                        <Link to={`/book/${book.ID}`}>
                          <Image 
                            className="book-image"
                            src={book?.Cover} 
                            alt={book?.Title} 
                            width={130}
                            preview={false}
                            fallback={missingImage}
                          />
                        </Link>
                      </div>
                      <div className="book-details-description-wrapper">
                        <Link to={`/book/${book.ID}`}>
                          <h2 className="title">{book?.Title}</h2>
                        </Link>
                        <div className="rating">
                          <Rate allowHalf disabled value={book?.AverageRating} defaultValue={book?.AverageRating} />&nbsp;&nbsp;
                          ({book?.RatingsCount || 0})
                        </div>
                        <p className="author">
                          Paperback, English &nbsp;&nbsp;|&nbsp;&nbsp; {`${book?.Authors?.join(', ') || book?.Author}`}
                        </p>
                        <br />
                        <p className="price">
                          { getPriceLabel(book?.ListPrice?.amount, book?.Country, book?.ListPrice?.currencyCode) }
                        </p>
                      </div>
                      <div className="price-qty-details-wrapper">
                        <div className="qty">
                          <span>Quantity</span>
                          <Select 
                            size='large'
                            defaultValue={book.count} 
                            value={book.count} 
                            style={{ width: 75, height: 42 }} 
                            onChange={qty => changeQty(book, qty)}
                          >
                            {
                              Array.from({length: 10}, (x, i) => i + 1).map(value => 
                                <Select.Option key={value} value={value}>{value}</Select.Option>
                              )
                            }
                          </Select>
                        </div>
                        <p className="price">
                          { getPriceLabel(book?.ListPrice?.amount * book.count, book?.Country, book?.ListPrice?.currencyCode) }
                        </p>
                        <button className="remove" onClick={() => removeBook(book)}>remove</button>
                      </div>
                    </div>
                  ))
                }
              </div>

              <div className="card cart-total-wrapper">
                <div className="upper-section">
                  <div>
                    <p>Delivery cost</p>
                    <p className="highlight">Total</p>
                  </div>
                  <div>
                    <p>FREE</p>
                    <p className="highlight">{ priceLabel }</p>
                  </div>
                </div>
                <div className="lower-section">
                  <img src={cardsImage} alt="Accepted credit cards" className="cards"/>
                  <div className="cta-wrapper">
                    <Link to="/checkout">
                      <button className="primary">Checkout</button>
                    </Link>
                    - Or -
                    <img src={paypalImage} alt="Check out with PayPal" className="paypal"/>
                  </div>
                </div>
              </div>

              <div className="card suggestions-wrapper book-carousel-wrapper">
                <h3>Often bought with your items</h3>
                <BookCarousel books={books?.slice(randomBookIndex, randomBookIndex + 14)} />
              </div>
            </>
          )
        }
        <div className="continue-shopping">
          <Link to="/">
            <button className="continue">Continue shopping</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
