import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/globalState';
import cartIcon from '../assets/header/basket-shopping-solid.svg';
import { getPriceLabel } from '../utils/helpers';

const Cart = () => {
  const [total, setTotal] = useState(0);
  const { basket } = useContext(AppContext);

  useEffect(() => {
    setTotal(
      getPriceLabel(
        basket?.total, 
        basket.items?.[0]?.Country, 
        basket.items?.[0]?.ListPrice?.currencyCode
      )
    );
  }, [basket?.total]);

  return (
    <div className="cart-wrapper">
      <div className="cart-link">
        <span>{total}</span>
      </div>
      |
      <Link to="/cart" className="cart-link">
        <span>{basket?.count}</span>
        <img src={cartIcon} alt="cart" className="cart-icon" />
      </Link>
    </div>
  );
};

export default Cart;
