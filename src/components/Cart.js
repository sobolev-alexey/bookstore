import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/globalState';
import cartIcon from '../assets/basket-shopping-solid.svg';
import { getPriceLabel } from '../utils/helpers';

const Cart = () => {
  const { cartItems } = useContext(AppContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((total, item) => total + item?.ListPrice?.amount, 0);
    setTotal(getPriceLabel(total, cartItems?.[0]?.Country, cartItems?.[0]?.ListPrice?.currencyCode));
  }, [cartItems?.length]);

  return (
    <div className="cart-wrapper">
      <div className="cart-link">
        <span>{total}</span>
      </div>
      |
      <Link to="/cart" className="cart-link">
        <span>{cartItems?.length}</span>
        <img src={cartIcon} alt="cart" className="cart-icon" />
      </Link>
    </div>
  );
};

export default Cart;
