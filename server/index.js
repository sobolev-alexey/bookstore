const express = require('express');
const bodyParser = require('body-parser');
const csv = require('csvtojson');
const cors = require('cors');
const { fetchCovers, findBooks } = require('./utils');
require('dotenv').config();

const server = express();

//accept only JSON
server.use(bodyParser.json());
server.use(cors());

// health check API
server.get('/api/ping', (req, res) => res.send('pong'));

server.get('/api/books', async (req, res) => {
  try {
    const jsonBooks = await csv().fromFile('./books.csv');
    const bookData = await fetchCovers(jsonBooks);
    res.send(bookData);
  } catch (error) { 
    console.error(error);
  }
});

//set port and log to the console
server.listen(3000, () => console.log('server listening'));

async function fetchData() {
  try {
    const jsonBooks = await csv().fromFile('./books.csv');
    const bookData = await fetchCovers(jsonBooks);
    console.log('Fetched', bookData.length);
  } catch (error) { 
    console.error(error);
  }
}

fetchData();
