const express = require('express');
const db = require('./mySqlDb');
const categories = require('./app/categories');
const places = require('./app/places');
const items = require('./app/items');
const app = express();

const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/categories', categories);
app.use('/places', places);
app.use('/items', items);

const run = async () => {
  await db.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
};

run().catch(e => console.error(e));

