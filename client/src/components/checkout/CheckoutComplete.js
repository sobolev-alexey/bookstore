import { Link } from 'react-router-dom';

const CheckoutComplete = ({ orderID, updateBasket }) => {
  return (
    <div className="card order-wrapper">
      <div className="order-title" role="alert">
        Thanks for purchasing!
      </div>
      <div className="order-message">
        Your Order ID is <b>{orderID}</b>
      </div>
      <Link to="/" className="order-cta">
        <button className="primary large" onClick={() => updateBasket()}>
          Continue shopping
        </button>
      </Link>
    </div>
  );
};

export default CheckoutComplete;
