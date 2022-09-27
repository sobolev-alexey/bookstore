import React, { useContext, useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { Layout } from '../components';
import { getPriceLabel } from '../utils/helpers';
import { AppContext } from '../context/globalState';
import cartIcon from '../assets/header/basket-shopping-solid.svg';

const Checkout = () => {
  const { basket } = useContext(AppContext);
  const [form] = Form.useForm();
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

  const processPayment = async () => {

  }

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
          <h3>1. Delivery Address</h3>
          <Form
            layout='vertical'
            form={form}
            validateTrigger='onChange'
            scrollToFirstError
          >
            <Form.Item 
              required 
              // hasFeedback
              name="name"
              label="Full name"
              extra="First and last name. For example: John Smith"
              rules={[{ required: true, message: 'Please enter your Full name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item 
              required 
              // hasFeedback
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
              required 
              // hasFeedback
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
              required 
              // hasFeedback
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
          <button className="primary" onClick={processPayment}>Buy now</button>
          <p className="consent">
            In placing your order, you are confirming that you have read and agree to our <u>Terms and Conditions</u>. Please also see our <u>Privacy Policy</u> and our <u>Cookies Policy</u>.
          </p>
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
