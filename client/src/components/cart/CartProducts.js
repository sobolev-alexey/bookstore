import { Image, Rate, Select } from 'antd';
import { Link } from 'react-router-dom'; 
import missingImage from '../../assets/common/empty.png';
import { getPriceLabel } from '../../utils/helpers';

const CartProducts = ({ basket, removeBook, changeQty }) => {
  return (
    <div className="card cart-main-details-wrapper">
      <h3>Shopping basket details</h3>
      {
        basket.items?.map(book => (
          <div className="book-details-wrapper" key={book.id}>
            <div className="book-details-image-wrapper">
              <Link to={`/book/${book.id}`}>
                <Image 
                  className="book-image"
                  src={book?.cover} 
                  alt={book?.title} 
                  width={130}
                  preview={false}
                  fallback={missingImage}
                />
              </Link>
            </div>
            <div className="book-details-description-wrapper">
              <Link to={`/book/${book.id}`}>
                <h2 className="title">{book?.title}</h2>
              </Link>
              <div className="rating">
                <Rate allowHalf disabled value={book?.averageRating} defaultValue={book?.averageRating} />&nbsp;&nbsp;
                ({book?.ratingsCount || 0})
              </div>
              <p className="author">
                Paperback, English &nbsp;&nbsp;|&nbsp;&nbsp; {`${book?.authors || book?.author}`}
              </p>
              <br />
              <p className="price">
                { getPriceLabel(book?.listPrice, book?.country, book?.currency) }
              </p>
            </div>
            <div className="price-qty-details-wrapper">
              <div className="qty">
                <span>Quantity</span>
                <Select 
                  size='large'
                  defaultValue={book.count} 
                  value={book.count} 
                  style={{ width: 75, height: 42 }} 
                  onChange={qty => changeQty(book, qty)}
                >
                  {
                    Array.from({length: 10}, (x, i) => i + 1).map(value => 
                      <Select.Option key={value} value={value}>{value}</Select.Option>
                    )
                  }
                </Select>
              </div>
              <p className="price">
                { getPriceLabel(book?.listPrice * book.count, book?.country, book?.currency) }
              </p>
              <button className="remove" onClick={() => removeBook(book)}>remove</button>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default CartProducts;
