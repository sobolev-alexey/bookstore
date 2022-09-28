import React, { useContext, useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, CheckoutPaymentForm } from '../components';
import { getPriceLabel } from '../utils/helpers';
import { AppContext } from '../context/globalState';
import cartIcon from '../assets/header/basket-shopping-solid.svg';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Checkout = () => {
  const navigate = useNavigate();
  const { basket, updateBasket } = useContext(AppContext);
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [isFormValid, setFormValid] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isStripeAvailable] = useState(!!process.env.REACT_APP_STRIPE_KEY);

  useEffect(() => {
    if (basket?.total === 0) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    setTotal(
      getPriceLabel(
        basket?.total, 
        basket.items?.[0]?.Country, 
        basket.items?.[0]?.ListPrice?.currencyCode
      )
    );
  }, [basket?.total]);

  const processPayment = async (paymentDetails) => {
    setOrderDetails(paymentDetails);
    updateBasket();
  }

  const validate = () => {
    const { name, address1, city, postcode } = form.getFieldsValue();
    if (name && address1 && city && postcode) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }

  return (
    <Layout>
      <div className="checkout-page-wrapper">
        <div className="checkout-main-column-wrapper">
          <div className="steps-wrapper">
            <div className="step active">1. Payment details</div>
            { !orderDetails && <div className="divider" /> }
            <div className={`step ${orderDetails && 'active'}`}>2. Order placed</div>
          </div>
          {
            orderDetails ? (
              <div className="card order-wrapper">
                <div className="order-title" role="alert">
                  Thanks for purchasing!
                </div>
                <div className="order-message">
                  Your Order ID is <b>{orderDetails?.orderId}</b>
                </div>
                <Link to="/" className="order-cta">
                  <button className="primary large">
                    Continue shopping
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <div className="card address-details-wrapper">
                  <h3>1. Delivery Address</h3>
                  <Form
                    layout='vertical'
                    form={form}
                    validateTrigger='onChange'
                    scrollToFirstError
                    autoComplete="off"
                    size="large"
                    className="address-form"
                    onValuesChange={validate}
                  >
                    <Form.Item 
                      name="name"
                      label="Full name"
                      extra="First and last name. For example: John Smith"
                      rules={[{ required: true, message: 'Please enter your Full name' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item 
                      name="address1"
                      label="Address line 1"
                      extra="For example: street address, PO box, company name, c/o"
                      rules={[{ required: true, message: 'Please enter your Address line 1' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item 
                      name="address2"
                      label="Address line 2"
                      extra="For example: apartment, suite, unit, building, floor"
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item 
                      name="city"
                      label="Town/City"
                      rules={[{ required: true, message: 'Please enter your Town/City' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item 
                      name="state"
                      label="County/State"
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item 
                      name="postcode"
                      label="Postcode/ZIP"
                      extra="If you don't have a postcode or ZIP, please write 'No Postcode'"
                      rules={[{ required: true, message: "Please enter your postcode/ZIP or write 'No Postcode'" }]}
                    >
                      <Input />
                    </Form.Item>
                  </Form>
                </div>
                <div className="card payment-details-wrapper">
                  <h3>2. Payment</h3>
                  {
                    isStripeAvailable ? (
                      <Elements stripe={stripePromise}>
                        <CheckoutPaymentForm 
                          amount={basket?.total} 
                          currency={basket.items?.[0]?.ListPrice?.currencyCode} 
                          callback={processPayment} 
                          isFormValid={isFormValid}
                        />
                      </Elements>
                    ) : (
                      <button 
                        className="primary"
                        onClick={() => processPayment({ orderId: 123456 })}
                        disabled={!isFormValid}
                      >Buy now</button>
                    )
                  }
                  <p className="consent">
                    In placing your order, you are confirming that you have read and agree to our <u>Terms and Conditions</u>. Please also see our <u>Privacy Policy</u> and our <u>Cookies Policy</u>.
                  </p>
                </div>
              </>
            )
          }
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
                  <div className="summary-item" key={book?.ID}>
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
