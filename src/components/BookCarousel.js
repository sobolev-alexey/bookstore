import React from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { BookCard } from '.';

const BookCarousel = ({ books }) => {
  const pageSize = 7;
  const arr = new Array(Math.ceil(books.length / pageSize)).fill({});

  const Arrow = ({ currentSlide, direction, slideCount, ...carouselProps }) =>
    direction === 'left' ? (
      <LeftOutlined {...carouselProps} />
    ) : (
      <RightOutlined {...carouselProps} />
    )

  return (
    <div className="books-carousel">
      <Carousel 
        autoplay={false}
        dots={false}
        arrows 
        lazyLoad
        prevArrow={<Arrow direction="left" />} 
        nextArrow={<Arrow direction="right" />}
      >
        {
          arr?.map((page, index) => (
            <div key={index + 1}>
              <div className="books-page">
                {
                  books
                    ?.slice(index * pageSize, (index + 1) * pageSize)
                    ?.map(book => <BookCard book={book} key={book?.ID} />)
                }
              </div>
            </div>
          ))
        }
      </Carousel>
    </div>
  );
};

export default BookCarousel;
