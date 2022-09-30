import { useContext, useState, useEffect } from 'react';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, CheckoutPayment, CheckoutSummary, CheckoutAddress, CheckoutComplete 
} from '../components';
import { getPriceLabel } from '../utils/helpers';
import callApi from '../utils/callApi';
import { AppContext } from '../context/globalState';

const Checkout = () => {
  const navigate = useNavigate();
  const { basket, updateBasket } = useContext(AppContext);
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [isFormValid, setFormValid] = useState(false);
  const [orderID, setOrderID] = useState('');

  useEffect(() => {
    if (basket?.total === 0) {
      navigate('/');
    }

    // Clear basket if order was placed
    return () => {
      if (orderID) {
        updateBasket();
      }
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    setTotal(
      getPriceLabel(
        basket?.total, 
        basket.items?.[0]?.country, 
        basket.items?.[0]?.currency
      )
    );
  }, [basket?.total]); // eslint-disable-line

  const processPayment = async (paymentDetails) => {
    await callApi('post', 'order', { 
      ...form.getFieldsValue(), 
      ...paymentDetails,
      amount: Number(basket?.total.toFixed(2)),
      bookIds: basket?.items?.map(item => item.id).join(', '),
      basket: JSON.stringify(basket.items)
    });
    setOrderID(paymentDetails.orderId);
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
            { !orderID && <div className="divider" /> }
            <div className={`step ${orderID && 'active'}`}>2. Order placed</div>
          </div>
          {
            orderID ? (
              <CheckoutComplete orderID={orderID} updateBasket={updateBasket} />
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
                    <CheckoutAddress />
                  </Form>
                </div>
                <CheckoutPayment 
                  basket={basket} 
                  isFormValid={isFormValid} 
                  processPayment={processPayment} 
                />
              </>
            )
          }
        </div>
        <CheckoutSummary basket={basket} total={total} />
      </div>
    </Layout>
  );
};

export default Checkout;
