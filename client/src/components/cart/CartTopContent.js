import { Link } from 'react-router-dom'; 
import basketImage from '../../assets/cart/basket-shopping-solid-black.svg';
import paypalImage from '../../assets/cart/paypal_button.jpg';

const CartTopContent = ({ basket, priceLabel }) => {
  return (
    <div className="card cart-top-content-wrapper">
      <div className="cart-top-content">
        <span className="cart-total">
          <img src={basketImage} alt="" className="icon"/>&nbsp;
          <p>
            You have {basket.count} items for a total of <b>{ priceLabel }</b> in your basket.
          </p>
        </span>
        <span className="action-buttons">
          <img src={paypalImage} alt="Check out with PayPal" className="paypal"/>
          &nbsp;&nbsp;&nbsp;&nbsp; - Or -  &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/checkout">
            <button className="primary">Checkout</button>
          </Link>
        </span>
      </div>
      <p className="cart-bottom-content">
        In placing your order, you are confirming that you have read and agree to our <u>Terms and Conditions</u>. Please also see our <u>Privacy Policy</u> and our <u>Cookies Policy</u>.
      </p>
    </div>
  );
};

export default CartTopContent;
