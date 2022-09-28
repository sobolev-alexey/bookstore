// https://www.stripe.com/docs/payments/integration-builder
// https://codesandbox.io/s/react-stripe-js-card-detailed-omfb3?file=/src/App.js

import React, { useState } from "react";
import {loadStripe} from '@stripe/stripe-js';
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Input, Form } from 'antd';
import { isEmpty } from 'lodash';
import { SubmitButton, CardField, ErrorMessage } from "./StripeComponents";
import callApi from '../../utils/callApi';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const StripeCheckoutForm = ({ amount, currency = 'eur', isFormValid, callback }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({});
  const [stripeForm] = Form.useForm();

  const handleSubmit = async () => {
    try {
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }

      if (error) {
        elements.getElement("card").focus();
        return;
      }

      if (isEmpty(billingDetails)) {
        return;
      }

      if (cardComplete) {
        setProcessing(true);
      }

      const response = await callApi('post', 'payment', { amount, currency });
      const { clientSecret } = response;

      if (!clientSecret) {
        setError('No client key found');
        setProcessing(false);
        return;
      }

      if (response?.status === 'error' && response?.error) {
        setError(response?.error);
        setProcessing(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { 
            name: billingDetails?.cardholder, 
            email: billingDetails?.email 
          },
        }
      });

      if (result?.error) {
        // Show error to your customer (e.g., insufficient funds)
        // console.log(result?.error?.message);
        setError(result?.error);
      } else {

        // The payment has been processed!
        if (result?.paymentIntent?.status === 'succeeded') {
          if (!response?.error && response?.status !== 'error') {
            callback({ ...billingDetails, orderId: result?.paymentIntent?.id });
          } else {
            setError(response?.error);
          }
        }
      }

      setProcessing(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setProcessing(false);
    }
  };

  return (
    <div className="stripe-form-wrapper">
      <Form
        form={stripeForm}
        size="large" 
        name="stripe-form" 
        className="stripe-form"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Cardholder Name" 
          name="cardholder"
          autoComplete="off" 
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, cardholder: e.target.value });
          }}
          rules={[
            {
              required: true,
              message: "Please provide cardholder name!",
            },
            {
              min: 2,
              max: 64,
              message: "Name must be longer than 1 character",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          autoComplete="off"
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
          rules={[
            {
              type: "email",
              message: "This is not a valid email!",
            },
            {
              required: true,
              message: "Please provide your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
        {error && <ErrorMessage onClick={() => setError(null)}>{error.message}</ErrorMessage>}
        <SubmitButton 
          processing={processing} 
          error={error} 
          disabled={!stripe || !cardComplete || !isFormValid}
          type="submit"
        >
          Buy now
        </SubmitButton>
      </Form>
    </div>
  )
};

const PaymentForm = ({ basket, isFormValid, callback}) => {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm 
        amount={basket?.total} 
        currency={basket.items?.[0]?.currency} 
        callback={callback} 
        isFormValid={isFormValid}
      />
    </Elements>
  )
}

export default PaymentForm;