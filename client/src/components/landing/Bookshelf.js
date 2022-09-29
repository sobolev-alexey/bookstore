import React, { useState, useEffect, useRef, useContext } from 'react';
import { BookCarousel } from '..';
import { AppContext } from '../../context/globalState';

function Bookshelf({ books }) {
  const { setRefs } = useContext(AppContext);
  const [fiction, setFiction] = useState([]);
  const [nonfiction, setNonfiction] = useState([]);
  const [tech, setTech] = useState([]);
  const [science, setScience] = useState([]);
  const [philosophy, setPhilosophy] = useState([]);

  const refs = useRef([]);

  useEffect(() => {
    setRefs(refs);
  }, []); // eslint-disable-line

  useEffect(() => {
    sortByGenre(books);
  }, [books.length]); // eslint-disable-line

  function sortByGenre(books) {
    const fiction = [];
    const nonfiction = [];
    const tech = [];
    const science = [];
    const philosophy = [];

    books
    // ?.filter(book => book?.listPrice)
    ?.sort((a, b) => b?.ratingsCount - a?.ratingsCount)
    ?.sort((a, b) => b?.averageRating - a?.averageRating)
    ?.forEach(book => {
      if (book?.genre === 'fiction') {
        fiction.push(book);
      } else if (book?.genre === 'nonfiction') {
        nonfiction.push(book);
      } else if (book?.genre === 'tech') {
        tech.push(book);
      } else if (book?.genre === 'science') {
        science.push(book);
      } else if (book?.genre === 'philosophy') {
        philosophy.push(book);
      } 
    });
    
    setFiction(fiction);
    setNonfiction(nonfiction);
    setTech(tech);
    setScience(science);
    setPhilosophy(philosophy);
  }

  return (
    <>
      <div 
        className="book-carousel-wrapper bestselling" 
        ref={(ref) => refs.current.push({ key: 'bestselling', ref })}
      >
        <h2>Bestselling Books</h2>
        <BookCarousel
          books={books
            ?.filter(book => book?.listPrice && book?.ratingsCount > 0)
            ?.sort((a, b) => b?.ratingsCount - a?.ratingsCount)
          } 
        />
      </div>
      <div 
        className="book-carousel-wrapper topRated" 
        ref={(ref) => refs.current.push({ key: 'topRated', ref })}
      >
        <h2>Top rated</h2>
        <BookCarousel
          books={books
            ?.filter(book => book?.listPrice && book?.averageRating > 0 && book?.ratingsCount > 0)
            ?.sort((a, b) => b?.ratingsCount - a?.ratingsCount)
            ?.sort((a, b) => b?.averageRating - a?.averageRating)
          } 
        />
      </div>
      <div 
        className="book-carousel-wrapper newReleases"
        ref={(ref) => refs.current.push({ key: 'newReleases', ref })}
      >
        <h2>New releases and in the news</h2>
        <BookCarousel
          books={books
            ?.filter(book => book?.listPrice)
            ?.sort((a, b) => a?.ratingsCount - b?.ratingsCount)
          } 
        />
      </div>
      <div 
        className="book-carousel-wrapper nonfiction"
        ref={(ref) => refs.current.push({ key: 'nonfiction', ref})}
      >
        <h2>Non-fiction Books</h2>
        <BookCarousel books={nonfiction} />
      </div>
      <div 
        className="book-carousel-wrapper fiction"
        ref={(ref) => refs.current.push({ key: 'fiction', ref})}
      >
        <h2>Fiction Books</h2>
        <BookCarousel books={fiction} />
      </div>
      <div 
        className="book-carousel-wrapper tech"
        ref={(ref) => refs.current.push({ key: 'tech', ref})}
      >
        <h2>Tech Books</h2>
        <BookCarousel books={tech} />
      </div>
      <div 
        className="book-carousel-wrapper philosophy"
        ref={(ref) => refs.current.push({ key: 'philosophy', ref})}
      >
        <h2>Philosophy Books</h2>
        <BookCarousel books={philosophy} />
      </div>
      <div 
        className="book-carousel-wrapper science"
        ref={(ref) => refs.current.push({ key: 'science', ref})}
      >
        <h2>Science Books</h2>
        <BookCarousel books={science} />
      </div>
    </>
  );
};

export default React.memo(Bookshelf);
