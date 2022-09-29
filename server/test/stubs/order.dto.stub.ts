import { OrderDto } from "src/orders/dto/order.dto";

export const OrderDtoStub = (): OrderDto => {
  return {
    name: 'df',
    address1: 'sdf',
    address2: 'sdf',
    city: 'sdf',
    postcode: 'sdf',
    cardholder: 'sdf',
    email: 'a@a.com',
    orderId: '',
    amount: 32.6,
    bookIds: 'nUc7TS6, m7Ejng6',
    basket: '[{"id":"Prmjztd","author":"Crichton, Michael","genre":"fiction","subGenre":"novel","cover":"http://books.google.com/books/content?id=V5s14nks9I8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","title":"Jurassic Park","pageCount":416,"listPrice":9.7,"averageRating":4,"ratingsCount":1711,"currency":"EUR","categories":"Fiction","authors":"Michael Crichton","height":"174","publisher":"Ballantine Books","description":"#1","isbn":"9780307763051","country":"DE","publishedDate":"2012-05-14","count":1},{"id":"72ckrry","author":"Bodanis, David","genre":"science","subGenre":"physics","cover":"http://books.google.com/books/content?id=c-gfwgw1JSEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","title":"Electric Universe","pageCount":320,"listPrice":15.7,"averageRating":3,"ratingsCount":9,"currency":"EUR","categories":"Science","authors":"David Bodanis","height":"201","publisher":"Crown","description":".","isbn":"9781400050604","country":"DE","publishedDate":"2005-02-15","count":1},{"id":"LDmJj79","author":"Dalrymple, William","genre":"nonfiction","subGenre":"history","cover":"http://books.google.com/books/content?id=GVvUJVmVr8kC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","title":"City of Djinns","pageCount":352,"listPrice":15.7,"averageRating":4.5,"ratingsCount":2,"currency":"EUR","categories":"Travel","authors":"William Dalrymple","height":"198","publisher":"Penguin","description":"P.","isbn":"9781101127018","country":"DE","publishedDate":"2003-03-25","count":1},{"id":"ckLLsoW","author":"Follett, Ken","genre":"fiction","cover":"http://books.google.com/books/content?id=VB7IAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api","title":"The Pillars of the Earth","listPrice":11.2,"averageRating":3.5,"ratingsCount":3319,"currency":"EUR","country":"DE","count":1}]'
  };
};