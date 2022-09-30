import { useContext, useState, useEffect } from 'react';
import { Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/globalState';
import { Layout, MainDetails, AdditionalDetails, SuggestionDetails } from '../components';
import callApi from '../utils/callApi';

const Details = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { books, basket, updateBasket } = useContext(AppContext);
  const [book, setBook] = useState({});
  const [randomBookIndex, setRandomBookIndex] = useState(0);

  useEffect(() => {
    async function getBook() {
      const backendResponse = await callApi('get', `books/${bookId}`);
      if (backendResponse === 'Book not found') {
        navigate('/');
      } else {
        setBook(backendResponse);
      }
    }

    getBook();
    setRandomBookIndex(Math.floor(Math.random() * books?.length - 100) + 14);
  }, [bookId]); // eslint-disable-line

  const addBook = book => {
    const myBasket = { ...basket };
    myBasket.total += book?.listPrice;
    myBasket.count += 1;

    const similarBook = myBasket?.items?.find(item => book.id === item.id);
    if (similarBook) {
      similarBook.count += 1; 
    } else {
      myBasket?.items.push({
        ...book,
        count: 1
      });
    }
    updateBasket(myBasket);
  }

  return (
    <Layout>
      {
        !book || !book?.id 
          ? <Spin size="large" /> 
          : (
              <div className="details-page-wrapper">
                <MainDetails book={book} addBook={addBook} />
                <AdditionalDetails book={book} />
                <SuggestionDetails book={book} books={books} index={randomBookIndex} />
              </div>
            )
      }
    </Layout>
  );
}

export default Details;
