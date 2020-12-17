const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const filterDB = id => (
  db.concerts.filter(content => content.id == id)
);

router.route('/concerts').get((req, res) => {
  res.send(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  res.send(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

router.route('/concerts/:id').get((req, res) => {
  const element = db.concerts.filter(
    (element) => element.id === parseInt(req.params.id)
  );
  res.send(element);
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;

  const concert = {
    id: uuidv4(),
    performer,
    genre,
    price,
    day,
    image,
  };

  db.concerts.push(concert);

  return res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  filterDB(req.params.id).forEach(content => {
    content.performer = req.body.performer;
    content.genre = req.body.genre;
    content.price = req.body.price;
    content.day = req.body.day;
    content.image = req.body.image;
  });

  res.json({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts = db.concerts.filter(
    (element) => element.id !== parseInt(req.params.id)
  );

  return res.json({ message: 'OK' });
});

module.exports = router;