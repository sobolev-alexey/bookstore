const AdditionalDetails = ({ book }) => {
  return (
    <div className="card additional-details-wrapper">
      <h3>Product details</h3>
      <div className="product-details-wrapper">
          <span><p className="bold">Format:</p><p>Paperback | {book?.pageCount} pages</p></span>
          <span><p className="bold">Publication date:</p><p>{book?.publishedDate}</p></span>
          <span><p className="bold">Publisher:</p><p>{book?.publisher}</p></span>
          <span><p className="bold">Language:</p><p>{book?.country}</p></span>
          <span><p className="bold">ISBN13:</p><p>{book?.isbn}</p></span>
          <span><p className="bold">Category:</p><p>{book?.categories || book?.genre}</p></span>
      </div>
    </div>
  );
};

export default AdditionalDetails;
