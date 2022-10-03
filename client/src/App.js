import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import GlobalState from './context/globalState';
import 'antd/dist/antd.min.css';
import './styles/index.scss';
import { Landing, Details, Cart, Checkout } from './pages';
import { ErrorFallback } from './components';
import loadFonts from './utils/fonts';

loadFonts();

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.5,
});

const App = () => (
  <Sentry.ErrorBoundary fallback={ErrorFallback}>
    <GlobalState>
      <BrowserRouter>
        <Routes>
          <Route path={'/book/:bookId'} element={<Details />} />
          <Route path={'/cart'} element={<Cart />} />
          <Route path={'/checkout'} element={<Checkout />} />
          <Route index element={<Landing />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </GlobalState>
  </Sentry.ErrorBoundary>
);

export default Sentry.withProfiler(App);