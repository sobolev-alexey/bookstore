import { getPriceLabel } from '../../utils/helpers';
import cartIcon from '../../assets/header/basket-shopping-solid.svg';

const CheckoutSummary = ({ basket, total }) => {
  return (
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
              <div className="summary-item" key={book?.id}>
                <div className="title">
                  <p>{book?.title} (Paperback)</p>
                  <p>x{book?.count}</p>
                </div>
                <p className="price">
                  { getPriceLabel(book?.listPrice, book?.country, book?.currency) }
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
  );
};

export default CheckoutSummary;
