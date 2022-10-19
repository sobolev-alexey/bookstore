import { useContext } from 'react';
import { Spin } from 'antd';
import useSWR from 'swr';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/globalState';
import { Layout, MainDetails, AdditionalDetails, SuggestionDetails } from '../components';

const Details = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const { books, basket, updateBasket } = useContext(AppContext);

  const { data: book, error } = useSWR(`${process.env.REACT_APP_BACKEND_URL}/books/${bookId}`);
  if (error) {
    navigate('/');
  }

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
        !book || !book?.id || !books?.length
          ? <Spin size="large" /> 
          : (
              <div className="details-page-wrapper">
                <MainDetails book={book} addBook={addBook} />
                <AdditionalDetails book={book} />
                <SuggestionDetails book={book} books={books} />
              </div>
            )
      }
    </Layout>
  );
}

export default Details;
