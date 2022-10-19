import { BookCarousel } from '..';
import { getRandomBooks } from '../../utils/helpers';

const Suggestions = ({ book, books }) => {
  return (
    <>
      <div className="card suggestions-wrapper book-carousel-wrapper similar">
        <h3>People who bought this also bought</h3>
        <BookCarousel books={getRandomBooks(books)} />
      </div>
      <div className="card suggestions-wrapper book-carousel-wrapper bestselling">
        <h3>Bestsellers in {book?.categories}</h3>
        <BookCarousel 
          books={books
            ?.filter(item => item?.listPrice && item?.genre === book?.genre)
            ?.sort((a, b) => b?.ratingsCount - a?.ratingsCount)
            ?.sort((a, b) => b?.averageRating - a?.averageRating)
          } 
        />
      </div>
    </>
  );
};

export default Suggestions;
