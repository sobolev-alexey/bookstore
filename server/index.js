const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csvtojson');
const cors = require('cors');

const server = express();

//accept only JSON
server.use(bodyParser.json());
server.use(cors());

// healthcheck API
server.get('/api/ping', (req, res) => res.send('pong'));

server.get('/api/books', async (req, res) => {
  const jsonBooks = await csv().fromFile('./books.csv');
  res.send(jsonBooks);
});

//set port and log to the console
server.listen(3000, () => console.log('server listening'));
