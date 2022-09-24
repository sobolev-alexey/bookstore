import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import freeDelivery from '../assets/free-delivery-single-bg.png';
import rocket from '../assets/rocket.svg';
import logo from '../assets/logo.svg';
import { Search, Cart } from '.';

const Header = () => (
  <header className="header-wrapper">
    <div className="header-top-wrapper">
      <div className="header-content centered">
        <img src={freeDelivery} alt="Free delivery worldwide" className="free-delivery-banner"/>
        <div className="free-delivery">
          <img src={rocket} alt="" className="icon-rocket"/>&nbsp;
          <p>Free delivery worldwide</p>
        </div>
      </div>
    </div>
    <div className="header-middle-wrapper">
      <div className="header-content">
        <Link to="/"><img src={logo} alt="Bookstore" className="logo"/></Link>
        <Search />
      </div>
    </div>
    <div className="header-bottom-wrapper">
      <div className="header-content">
        <div className="category-wrapper">
          ddd
        </div>
        <Cart />
      </div>
    </div>
  </header>
);

export default Header;
