const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const db = require('../mySqlDb');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    let [items] = await db.getConnection().execute('SELECT id, category_id, place_id, title, date FROM items');
    return res.send(items);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [items] = await db.getConnection().execute('SELECT * FROM items WHERE id = ?', [req.params.id]);
    const item = items[0];
    if (!item) {
      return res.status(404).send({message: 'Not found'});
    }
    return res.send(item);
  } catch (e) {
    next(e);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.categoryId) {
      return res.status(400).send({error: 'Category is required'});
    }
    if (!req.body.placeId) {
      return res.status(400).send({error: 'Place is required'});
    }
    if (!req.body.title) {
      return res.status(400).send({error: 'Title is required'});
    }
    const itemData = {
      categoryId: parseInt(req.body.categoryId),
      placeId: parseInt(req.body.placeId),
      title: req.body.title,
      description: null,
      image: null,
    };
    if (req.body.description) {
      itemData.description = req.body.description;
    }
    if (req.file) {
      itemData.image = req.file.filename;
    }
    let query = 'INSERT INTO items (category_id, place_id, title, description, image) VALUES (?, ?, ?, ?, ?)';
    const [results] = await db.getConnection().execute(query, [
      itemData.categoryId,
      itemData.placeId,
      itemData.title,
      itemData.description,
      itemData.image,
    ]);
    const [items] = await db.getConnection().execute('SELECT * FROM items WHERE id = ?', [results.insertId]);
    return res.send(items[0]);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.categoryId) {
      return res.status(400).send({error: 'Category is required'});
    }
    if (!req.body.placeId) {
      return res.status(400).send({error: 'Place is required'});
    }
    if (!req.body.title) {
      return res.status(400).send({error: 'Title is required'});
    }
    const itemData = {
      id: req.params.id,
      categoryId: parseInt(req.body.categoryId),
      placeId: parseInt(req.body.placeId),
      title: req.body.title,
      description: null,
      image: null,
    };
    if (req.body.description) {
      itemData.description = req.body.description;
    }
    if (req.file) {
      itemData.image = req.file.filename;
    }
    let query = 'UPDATE items SET category_id = ?, place_id = ?, title = ?, description = ?, image = ? WHERE id = ?';
    await db.getConnection().execute(query, [
      itemData.categoryId,
      itemData.placeId,
      itemData.title,
      itemData.description,
      itemData.image,
      itemData.id,
    ]);
    const [items] = await db.getConnection().execute('SELECT * FROM items WHERE id = ?', [req.params.id]);
    return res.send(items[0]);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await db.getConnection().execute('DELETE FROM items WHERE id = ?', [req.params.id]);
    return res.send({message: `Deleted item with id ${req.params.id}`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
