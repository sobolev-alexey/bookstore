import React, { useContext, useState, useEffect } from 'react';
import { Layout } from '../components';
import { getPriceLabel } from '../utils/helpers';
import { AppContext } from '../context/globalState';
import cartIcon from '../assets/header/basket-shopping-solid.svg';

const Checkout = () => {
  const { basket } = useContext(AppContext);
  const [total, setTotal] = useState(0);
  const [isOrderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setTotal(
      getPriceLabel(
        basket?.total, 
        basket.items?.[0]?.Country, 
        basket.items?.[0]?.ListPrice?.currencyCode
      )
    );
  }, [basket?.total]);

  return (
    <Layout>
    <div className="checkout-page-wrapper">
      <div className="checkout-main-column-wrapper">
        <div className="steps-wrapper">
          <div className="step active">1. Payment details</div>
          { !isOrderPlaced && <div className="divider" /> }
          <div className={`step ${isOrderPlaced && 'active'}`}>2. Order placed</div>
        </div>
        <div className="card address-details-wrapper">
          Address
        </div>
        <div className="card payment-details-wrapper">
          Payment
        </div>
      </div>
      <div className="checkout-summary-column-wrapper">
        <div className="summary-details-wrapper">
          <div className="summary-header">
            <h3>Order summary</h3>
            <div className="mini-total-wrapper">
              <span className="cart-total"><img src={cartIcon} alt="cart" className="cart-icon" /> {basket?.count} items</span>
              <span className="total">{total}</span>
            </div>
          </div>
          <div className="summary-body">
            {
              basket.items?.map(book => (
                <div className="summary-item">
                  <div className="title">
                    <p>{book?.Title} (Paperback)</p>
                    <p>x{book?.count}</p>
                  </div>
                  <p className="price">
                    { getPriceLabel(book?.ListPrice?.amount, book?.Country, book?.ListPrice?.currencyCode) }
                  </p>
                </div>
              ))
            }
            <div className="summary-item">
              <div className="title">
                <p className="bold">Sub-total (incl. taxes)</p>
              </div>
              <p className="price">{ total }</p>
            </div>
            <div className="summary-item">
              <div className="title">
                <p className="bold">Delivery</p>
              </div>
              <p className="price bold">FREE</p>
            </div>
            <div className="summary-item">
              <div className="title">
                <p className="bold">Total</p>
              </div>
              <p className="price bold highlight">{ total }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Checkout;
