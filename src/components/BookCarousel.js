import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { BookCard } from '.';

const BookCarousel = ({ books }) => {
  const pageSize = 7;
  const arr = new Array(Math.ceil(books.length / pageSize)).fill({});

  return (
    <div className="books-carousel">
      <Carousel 
        autoplay={false}
        arrows 
        prevArrow={<LeftOutlined />} 
        nextArrow={<RightOutlined />}
        dots={false}
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
