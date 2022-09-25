import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'antd';
import { AppContext } from '../context/globalState';
import discountBanner from '../assets/discount.jpg';

function Banner() {
  const { books } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="banner-carousel-wrapper">
      <Carousel 
        autoplay
        lazyLoad
        autoplaySpeed={7000}
        dots={false}
      >
        <div>
          <img src={discountBanner} alt="10% Discount" className="carousel-item discount-banner"/>
        </div>
        {
          books
            ?.sort((a,b) => a?.AverageRating - b?.AverageRating)
            ?.slice(0, 3)
            ?.map(book => (
              <div key={book?.Title}>
                <div className="banner-book-cover carousel-item" key={book?.Title}>
                  <img src={book?.Cover} alt={book?.Title} className="banner-book-cover" />
                  <div className="book-details">
                    <h3>{book?.Title}</h3>
                    <p>by {book?.Author}</p>
                    <button className="primary" onClick={() => navigate(`/book/${book.ID}`)}>Details</button>
                  </div>
                </div>
              </div>
            ))
        }
      </Carousel>
    </div>
  );
};

export default React.memo(Banner);
