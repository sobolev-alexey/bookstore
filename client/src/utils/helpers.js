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


export const getRandomBooks = (books) => {
  if (books.length) {
    const randomBooks = Array.from({length: 50}, () => {
      const random = Math.floor(Math.random() * books?.length || 0);
      return books[random];
    });
    const result = [...new Map(randomBooks.map(item => [item['id'], item])).values()]
      ?.filter(item => item?.listPrice)
      ?.sort((a, b) => b?.ratingsCount - a?.ratingsCount)
      ?.sort((a, b) => b?.averageRating - a?.averageRating)
      ?.slice(0, 14);
    return result;
  }
  return [];
}