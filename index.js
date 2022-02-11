const express = require('express');
const cors = require('cors');
const db = require('./mySqlDb');
const categories = require('./app/categories');
const app = express();

const port = 8000;

app.use(cors());
app.use(express.json());
app.use('/categories', categories);

const run = async () => {
  await db.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port`);
  });
};

run().catch(e => console.error(e));

