import { Image, Rate } from 'antd';
import missingImage from '../../assets/common/empty.png';
import { PriceDetails } from '..';

const MainDetails = ({ book, addBook }) => {
  return (
    <div className="card main-details-wrapper">
      <div className="book-details-wrapper">
        <div className="book-details-image-wrapper">
          <Image 
            className="book-image"
            src={book?.cover} 
            alt={book?.title} 
            width={260}
            height={390}
            preview={false}
            fallback={missingImage}
          />
        </div>
        <div className="book-details-description-wrapper">
          <h2 className="title">{book?.title}</h2>
          <div className="rating">
            <Rate allowHalf disabled value={book?.averageRating} defaultValue={book?.averageRating} />&nbsp;&nbsp;
            ({book?.ratingsCount || 0})
          </div>
          <p className="author">By (author)
            {`  ${book?.authors || book?.author}`}
          </p>
          <br />
          <p className="description">{book?.description}</p>
        </div>
      </div>
      <PriceDetails book={book} addBook={addBook} />
    </div>
  );
};

export default MainDetails;
