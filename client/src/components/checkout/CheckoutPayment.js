import { useState } from 'react';
import { nanoid } from 'nanoid';
import { PaymentForm } from '..';

const CheckoutPayment = ({ basket, isFormValid, processPayment }) => {
  const [isStripeAvailable] = useState(!!process.env.REACT_APP_STRIPE_KEY);

  return (
    <div className="card payment-details-wrapper">
      <h3>2. Payment</h3>
      {
        isStripeAvailable ? (
          <PaymentForm 
            basket={basket}
            callback={processPayment} 
            isFormValid={isFormValid}
          />
        ) : (
          <button 
            className="primary"
            onClick={() => processPayment({ orderId: nanoid() })}
            disabled={!isFormValid}
          >Buy now</button>
        )
      }
      <p className="consent">
        In placing your order, you are confirming that you have read and agree to our <u>Terms and Conditions</u>. Please also see our <u>Privacy Policy</u> and our <u>Cookies Policy</u>.
      </p>
    </div>
  );
};

export default CheckoutPayment;
