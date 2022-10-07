import { ErrorBoundary } from 'react-error-boundary';
import { notification } from 'antd';
import { Header, Footer, ErrorFallback, CornerRibbon } from '..';

const Layout = ({ children }) => {
  const errorHandler = (error, info) => {
    console.error('Application error', error, info);
    notification['error']({
      key: 'api-error',
      duration: 10,
      message: 'Application Error',
      description: error?.message || 
        'There was an error loading the application. Please see console output for details.'
    });
  }

  return (
    <div className="layout">
      <Header />
        <ErrorBoundary 
          FallbackComponent={ErrorFallback} 
          onError={errorHandler}
        >
          {children}
        </ErrorBoundary>
      <Footer />
    </div>
  );
};

export default Layout;
