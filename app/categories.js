const express = require('express');
const db = require('../mySqlDb');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let [categories] = await db.getConnection().execute('SELECT id, title FROM categories');
    return res.send(categories);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [categories] = await db.getConnection().execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    const category = categories[0];
    if (!category) {
      return res.status(404).send({message: 'Not found'});
    }
    return res.send(category);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({error: 'Title is required'});
    }
    const categoryData = {
      title: req.body.title,
      description: null,
    };
    if (req.body.description) {
      categoryData.description = req.body.description;
    }
    let query = 'INSERT INTO categories (title, description) VALUES (?, ?)';
    const [results] = await db.getConnection().execute(query, [
      categoryData.title,
      categoryData.description
    ]);
    const [categories] = await db.getConnection().execute('SELECT * FROM categories WHERE id = ?', [results.insertId]);
    return res.send(categories[0]);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({error: 'Title is required'});
    }
    const categoryData = {
      id: req.params.id,
      title: req.body.title,
      description: null,
    };
    if (req.body.description) {
      categoryData.description = req.body.description;
    }
    let query = 'UPDATE categories SET title = ?, description = ? WHERE id = ?';
    await db.getConnection().execute(query, [
      categoryData.title,
      categoryData.description,
      categoryData.id,
    ]);
    const [categories] = await db.getConnection().execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    return res.send(categories[0]);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await db.getConnection().execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
    return res.send({message: `Deleted category with id ${req.params.id}`});
  } catch (e) {
    next(e);
  }
});


module.exports = router;
