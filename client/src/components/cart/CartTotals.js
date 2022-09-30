import { Link } from 'react-router-dom'; 
import paypalImage from '../../assets/cart/paypal_button.jpg';
import cardsImage from '../../assets/cart/cards.jpg';

const CartTotals = ({ priceLabel }) => {
  return (
    <div className="card cart-total-wrapper">
      <div className="upper-section">
        <div>
          <p>Delivery cost</p>
          <p className="highlight">Total</p>
        </div>
        <div>
          <p>FREE</p>
          <p className="highlight">{ priceLabel }</p>
        </div>
      </div>
      <div className="lower-section">
        <img src={cardsImage} alt="Accepted credit cards" className="cards"/>
        <div className="cta-wrapper">
          <Link to="/checkout">
            <button className="primary">Checkout</button>
          </Link>
          - Or -
          <img src={paypalImage} alt="Check out with PayPal" className="paypal"/>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
