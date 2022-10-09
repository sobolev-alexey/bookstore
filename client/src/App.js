import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { SWRConfig } from 'swr';
import { BrowserTracing } from '@sentry/tracing';
import GlobalState from './context/globalState';
import { Landing, Details, Cart, Checkout } from './pages';
import { ErrorFallback, Loading } from './components';
import loadFonts from './utils/fonts';
import { fetcher } from './utils/fetcher';

import 'antd/dist/antd.min.css';
import './styles/index.scss';

loadFonts();

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 0.5,
});

const App = () => (
  <Sentry.ErrorBoundary fallback={ErrorFallback}>
    <Suspense fallback={<Loading />}>
      <SWRConfig value={{ fetcher, suspense: true }}>
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
      </SWRConfig>
    </Suspense>
  </Sentry.ErrorBoundary>
);

export default Sentry.withProfiler(App);