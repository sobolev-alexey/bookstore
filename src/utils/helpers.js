export const getPriceLabel = (amount, country = 'DE', currency = 'EUR') => 
  new Intl.NumberFormat(country, { style: 'currency', currency }).format(amount);

export const findBooks = (books, searchQuery) =>
  books?.filter(book =>
        book?.Title?.toLowerCase().includes(searchQuery?.toLowerCase()) 
    || book?.Description?.toLowerCase().includes(searchQuery?.toLowerCase()) 
    || book?.Publisher?.toLowerCase().includes(searchQuery?.toLowerCase()) 
    || book?.Author?.toLowerCase().includes(searchQuery?.toLowerCase()) 
    || book?.Authors?.[0]?.toLowerCase().includes(searchQuery?.toLowerCase()) 
    || book?.ISBN?.toLowerCase().includes(searchQuery?.toLowerCase()) 
  ) || [];