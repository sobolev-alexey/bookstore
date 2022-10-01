import { PayPalButton } from "react-paypal-button-v2";

const PayPal = ({ amount, currency, callback }) => {
  if (!process.env.REACT_APP_PAYPAL_CLIENT_ID) return null;

  return (
    <>
      <PayPalButton
        amount={amount}
        currency={currency}
        shippingPreference="NO_SHIPPING"
        style={{
          layout: 'vertical',
          color:  'gold',
          shape:  'rect',
          label:  'paypal',
        }}
        options={{ 
          currency,
          clientId: process.env.REACT_APP_PAYPAL_CLIENT_ID,
          disableFunding: 'credit,card,paylater,giropay,sofort,sepa,ideal'
        }}
        onSuccess={callback}
      />
      &nbsp;&nbsp;&nbsp;&nbsp; - Or -  &nbsp;&nbsp;&nbsp;&nbsp;
    </>
  )
}

export default PayPal;