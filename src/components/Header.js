import React from 'react';
import { Link } from 'react-router-dom';
import freeDelivery from '../assets/header/free-delivery-single-bg.png';
import rocket from '../assets/header/rocket.svg';
import logo from '../assets/header/logo.svg';
import { Search, Cart, HeaderNavigation } from '.';

const Header = () => {
  return (
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
          <HeaderNavigation />
          <Cart />
        </div>
      </div>
    </header>
  );
}

export default Header;
