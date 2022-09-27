// https://www.stripe.com/docs/payments/integration-builder
// https://codesandbox.io/s/react-stripe-js-card-detailed-omfb3?file=/src/App.js

import React, { useEffect, useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Input, Form } from 'antd';
import { isEmpty } from 'lodash';
import { Link } from 'react-router-dom';
import { SubmitButton, CardField, ErrorMessage } from "./StripeComponents";
import callApi from '../../utils/callApi';

const StripeCheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [payment, setPayment] = useState(null);
  const [billingDetails, setBillingDetails] = useState({});
  const [stripeForm] = Form.useForm();

  const handleSubmit = async () => {
    try {
      // event.preventDefault();

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

      const response = await callApi('put', 'payment', billingDetails);
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
          billing_details: billingDetails,
        }
      });
      console.log('result', result)

      if (result?.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result?.error?.message);
        setError(result?.error);
      } else {
        // The payment has been processed!
        if (result?.paymentIntent?.status === 'succeeded') {
          if (!response?.error && response?.status !== 'error') {
            setPayment(result?.paymentIntent);
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

  return payment ? (
    <div className="stripe-result">
      <div className="stripe-result-title" role="alert">
        Thanks for purchasing!
      </div>
      <div className="stripe-result-message">
        Your transaction ID is {payment?.id}
      </div>
      <Link to="/" className="stripe-result-cta">
        <button className="primary large">
          Continue shopping
        </button>
      </Link>
    </div>
  ) : (
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
          label="Full Name" 
          name="name"
          autoComplete="off" 
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
          rules={[
            {
              required: true,
              message: "Please provide your name!",
            },
            {
              min: 2,
              max: 64,
              message: "Name must be longer than 1 character",
            },
          ]}
        >
          <Input className="rounded-input"/>
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
          <Input className="rounded-input"/>
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
          disabled={!stripe || !cardComplete}
          type="submit"
        >
          Buy now
        </SubmitButton>
      </Form>

    </div>
  );
};

export default StripeCheckoutForm;