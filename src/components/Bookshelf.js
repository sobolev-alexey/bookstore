import React, { useState, useEffect, useRef, useContext } from 'react';
import { BookCarousel } from '../components';
import { AppContext } from '../context/globalState';

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
  }, []);

  useEffect(() => {
    sortByGenre(books);
  }, [books.length]);

  function sortByGenre(books) {
    const fiction = [];
    const nonfiction = [];
    const tech = [];
    const science = [];
    const philosophy = [];

    books?.forEach(book => {
      if (book?.Genre === 'fiction') {
        fiction.push(book);
      } else if (book?.Genre === 'nonfiction') {
        nonfiction.push(book);
      } else if (book?.Genre === 'tech') {
        tech.push(book);
      } else if (book?.Genre === 'science') {
        science.push(book);
      } else if (book?.Genre === 'philosophy') {
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
        className="book-carousel-wrapper" 
        ref={(ref) => refs.current.push({ key: 'bestselling', ref })}
      >
        <h2>Bestselling Books</h2>
        <BookCarousel
          books={books
            ?.filter(book => book?.RatingsCount > 0)
            ?.sort((a, b) => b?.RatingsCount - a?.RatingsCount)
          } 
        />
      </div>
      <div 
        className="book-carousel-wrapper" 
        ref={(ref) => refs.current.push({ key: 'topRated', ref })}
      >
        <h2>Top rated</h2>
        <BookCarousel
          books={books
            ?.filter(book => book?.AverageRating > 0 && book?.RatingsCount > 0)
            ?.sort((a, b) => b?.RatingsCount - a?.RatingsCount)
            ?.sort((a, b) => b?.AverageRating - a?.AverageRating)
          } 
        />
      </div>
      <div 
        className="book-carousel-wrapper"
        ref={(ref) => refs.current.push({ key: 'newReleases', ref })}
      >
        <h2>New releases and in the news</h2>
        <BookCarousel
          books={books?.sort((a, b) => a?.RatingsCount - b?.RatingsCount)} 
        />
      </div>
      <div 
        className="book-carousel-wrapper"
        ref={(ref) => refs.current.push({ key: 'nonfiction', ref})}
      >
        <h2>Non-fiction Books</h2>
        <BookCarousel books={nonfiction} />
      </div>
      <div 
        className="book-carousel-wrapper"
        ref={(ref) => refs.current.push({ key: 'fiction', ref})}
      >
        <h2>Fiction Books</h2>
        <BookCarousel books={fiction} />
      </div>
      <div 
        className="book-carousel-wrapper"
        ref={(ref) => refs.current.push({ key: 'tech', ref})}
      >
        <h2>Tech Books</h2>
        <BookCarousel books={tech} />
      </div>
      <div 
        className="book-carousel-wrapper"
        ref={(ref) => refs.current.push({ key: 'philosophy', ref})}
      >
        <h2>Philosophy Books</h2>
        <BookCarousel books={philosophy} />
      </div>
      <div 
        className="book-carousel-wrapper"
        ref={(ref) => refs.current.push({ key: 'science', ref})}
      >
        <h2>Science Books</h2>
        <BookCarousel books={science} />
      </div>
    </>
  );
};

export default React.memo(Bookshelf);
