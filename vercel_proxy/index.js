const app = require('express')();
const proxy = require('express-http-proxy');

app.use('/', proxy('http://52.214.242.29:3000/api/'));
app.use('/ping', proxy('http://52.214.242.29:3000/api/ping'));
app.use('/books', proxy('http://52.214.242.29:3000/api/books'));
app.use('/books/:id', proxy('http://52.214.242.29:3000/api/books/:id'));
app.use('/search/:q', proxy('http://52.214.242.29:3000/api/search/:q'));
app.use('/order', proxy('http://52.214.242.29:3000/api/order'));
app.use('/payment', proxy('http://52.214.242.29:3000/api/payment'));

module.exports = app;
