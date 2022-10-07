import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { AppContext } from '../context/globalState';
import { getPriceLabel } from '../utils/helpers';
import callApi from '../utils/callApi';
import { 
  Layout, 
  BookCarousel, 
  EmptyBasket, 
  CartTopContent, 
  CartProducts, 
  CartTotals, 
  PayPalButton,
  CheckoutComplete,
} from '../components';

const Cart = () => {
  const { books, basket, updateBasket } = useContext(AppContext);
  const [randomBookIndex, setRandomBookIndex] = useState(0);
  const [priceLabel, setPriceLabel] = useState();
  const [orderID, setOrderID] = useState('');

  useEffect(() => {
    setPriceLabel(getPriceLabel(
      basket?.total, 
      basket.items?.[0]?.country, 
      basket.items?.[0]?.currency
    ))
    setRandomBookIndex(Math.floor(Math.random() * books?.length - 100) + 14);
  }, [basket?.total]); // eslint-disable-line

  const removeBook = book => {
    const myBasket = { ...basket };
    const index = myBasket?.items.findIndex(item => item.id === book.id);
    const item = myBasket?.items?.[index];
    
    if (index >= 0 && item) {
      myBasket?.items.splice(index, 1);
      // Re-calculate total
      const total = myBasket?.items?.reduce((total, item) => total + item.count * item.listPrice, 0);
      const count = myBasket?.items?.reduce((total, item) => total + item.count, 0);
      myBasket.total = total;
      myBasket.count = count;
    }

    updateBasket(myBasket);
  }

  const changeQty = (book, qty) => {
    const myBasket = { ...basket };
    const index = myBasket?.items.findIndex(item => item.id === book.id);
    const item = myBasket?.items?.[index];
    
    if (index >= 0 && item) {
      item.count = qty; 
    }

    // Re-calculate total
    const total = myBasket?.items?.reduce((total, item) => total + item.count * item.listPrice, 0);
    const count = myBasket?.items?.reduce((total, item) => total + item.count, 0);
    myBasket.total = total;
    myBasket.count = count;

    updateBasket(myBasket);
  }

  const processPayment = async (details, data) => {
    const name = `${details?.payer?.name?.given_name} ${details?.payer?.name?.surname}`;
    await callApi('post', 'order', { 
      name,
      address1: '',
      city: '',
      postcode: 'No Postcode',
      email: details?.payer?.email_address,
      cardholder: name,
      amount: Number(basket?.total.toFixed(2)),
      bookIds: basket?.items?.map(item => item.id).join(', '),
      basket: JSON.stringify(basket.items),
      orderId: data.orderID
    });
    setOrderID(data.orderID);
  }

  return (
    <Layout>
      <div className="cart-page-wrapper">
        {
          orderID ? (
            <CheckoutComplete orderID={orderID} updateBasket={updateBasket} />
          ) : (
            <>
              <h1>Your basket</h1>
              {
                basket.count === 0 ? <EmptyBasket /> : (
                  <>
                    <CartTopContent basket={basket} priceLabel={priceLabel}>
                      <PayPalButton
                        amount={basket?.total}
                        currency={basket.items?.[0]?.currency}
                        callback={processPayment}
                      />
                    </CartTopContent>
                    <CartProducts basket={basket} removeBook={removeBook} changeQty={changeQty} />
                    <CartTotals priceLabel={priceLabel}>
                      <PayPalButton
                        amount={basket?.total}
                        currency={basket.items?.[0]?.currency}
                        callback={processPayment}
                      />
                    </CartTotals>
                    <div className="card suggestions-wrapper book-carousel-wrapper">
                      <h3>Often bought with your items</h3>
                      <BookCarousel 
                        books={books
                          ?.filter(item => item?.listPrice)
                          ?.sort((a, b) => b?.ratingsCount - a?.ratingsCount)
                          ?.sort((a, b) => b?.averageRating - a?.averageRating)
                          ?.slice(randomBookIndex, randomBookIndex + 14)
                        } 
                      />
                    </div>
                  </>
                )
              }
              <div className="continue-shopping">
                <Link to="/">
                  <button className="continue">Continue shopping</button>
                </Link>
              </div>
            </>
          )
        }
      </div>
    </Layout>
  );
}

export default Cart;
