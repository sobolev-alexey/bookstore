import rocketImage from '../../assets/details/rocket_black.svg';
import checkImage from '../../assets/details/circle-check-regular.svg';
import { getPriceLabel } from '../../utils/helpers';

const PriceDetails = ({ book, addBook }) => {
  return (
    <div className="price-details-wrapper">
      <h1 className="price">          
        { 
          book?.listPrice 
          ? getPriceLabel(book?.listPrice, book?.country, book?.currency) 
          : <>Not available</>
        }
      </h1>
      <div className="marketing-wrapper">
        <div className="marketing bold">
          <img src={rocketImage} alt="" className="icon"/>&nbsp;
          <p>Free delivery worldwide</p>
        </div>
        <br />
        <div className="marketing bold">
          <img src={checkImage} alt="" className="icon"/>&nbsp;
          <p>Price includes VAT/import taxes for EU delivery</p>
        </div>
        <br />
        <div className="marketing">
          <img src={checkImage} alt="" className="icon"/>&nbsp;
          <p>Available. Expected delivery to Germany in 13-18 business days.</p>
        </div>
      </div>
      <button 
        className="primary long"
        onClick={() => addBook(book)}
        disabled={!book?.listPrice}
      >
        Add to basket
      </button>
    </div>
  );
};

export default PriceDetails;
