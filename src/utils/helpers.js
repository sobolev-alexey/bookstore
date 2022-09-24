export const getPriceLabel = (amount, country = 'DE', currency = 'EUR') => 
  new Intl.NumberFormat(country, { style: 'currency', currency }).format(amount);