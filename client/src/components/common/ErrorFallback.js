import { Result } from 'antd';
import { Link } from 'react-router-dom';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.error(error);

  const Home = () => (
    <a href="/" className="primary">
      <button 
        onClick={resetErrorBoundary}
        className="primary"
      >
        Back Home
      </button>
    </a>
  );

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={<Home/>}
    />
  );
}

export default ErrorFallback;