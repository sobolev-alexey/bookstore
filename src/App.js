import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalState from './context/globalState';
import 'antd/dist/antd.min.css';
import './styles/index.scss';
import { Landing, Details, Cart, Checkout } from './pages';
import loadFonts from './utils/fonts';

loadFonts();

const App = () => (
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
);

export default App;