const express = require('express');
const db = require('../mySqlDb');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let [places] = await db.getConnection().execute('SELECT id, title FROM places');
    return res.send(places);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [places] = await db.getConnection().execute('SELECT * FROM places WHERE id = ?', [req.params.id]);
    const place = places[0];
    if (!place) {
      return res.status(404).send({message: 'Not found'});
    }
    return res.send(place);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({error: 'Title is required'});
    }
    const placeData = {
      title: req.body.title,
      description: null,
    };
    if (req.body.description) {
      placeData.description = req.body.description;
    }
    let query = 'INSERT INTO places (title, description) VALUES (?, ?)';
    const [results] = await db.getConnection().execute(query, [
      placeData.title,
      placeData.description
    ]);
    const [places] = await db.getConnection().execute('SELECT * FROM places WHERE id = ?', [results.insertId]);
    const place = places[0];
    return res.send(place);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({error: 'Title is required'});
    }
    const placeData = {
      id: req.params.id,
      title: req.body.title,
      description: null,
    };
    if (req.body.description) {
      placeData.description = req.body.description;
    }
    let query = 'UPDATE places SET title = ?, description = ? WHERE id = ?';
    await db.getConnection().execute(query, [
      placeData.title,
      placeData.description,
      placeData.id,
    ]);
    const [places] = await db.getConnection().execute('SELECT * FROM places WHERE id = ?', [req.params.id]);
    return res.send(places[0]);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await db.getConnection().execute('DELETE FROM places WHERE id = ?', [req.params.id]);
    return res.send({message: `Deleted place with id ${req.params.id}`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
