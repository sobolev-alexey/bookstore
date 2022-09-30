import { BookCarousel } from '..';

const Suggestions = ({ book, books, index }) => {
  return (
    <>
      <div className="card suggestions-wrapper book-carousel-wrapper similar">
        <h3>People who bought this also bought</h3>
        <BookCarousel 
          books={books
            ?.filter(item => item?.listPrice)
            ?.sort((a, b) => b?.ratingsCount - a?.ratingsCount)
            ?.sort((a, b) => b?.averageRating - a?.averageRating)
            ?.slice(index, index + 35)
          } 
        />
      </div>
      <div className="card suggestions-wrapper book-carousel-wrapper bestselling">
        <h3>Bestsellers in {book?.categories}</h3>
        <BookCarousel 
          books={books
            ?.filter(item => item?.listPrice)
            ?.sort((a, b) => b?.ratingsCount - a?.ratingsCount)
            ?.sort((a, b) => b?.averageRating - a?.averageRating)
            ?.filter(item => item?.genre === book?.genre)
          } 
        />
      </div>
    </>
  );
};

export default Suggestions;
