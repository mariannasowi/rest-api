const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const filterDB = id => (
  db.seats.filter(content => content.id == id)
);

router.route('/seats').get((req, res) => {
  res.send(db.seats);
});

router.route('/seats/random').get((req, res) => {
  res.send(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

router.route('/seats/:id').get((req, res) => {
  const element = db.seats.filter(
    (element) => element.id === parseInt(req.params.id)
  );
  res.send(element);
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;

  const newSeat = {
    id: uuidv4(),
    day,
    seat,
    client,
    email,
  };

  db.seats.push(newSeat);

  return res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  filterDB(req.params.id).forEach(content => {
    content.day = req.body.day;
    content.seat = req.body.seat;
    content.client = req.body.client;
    content.email = req.body.email;
  });

  res.json({message: 'OK'});
});

router.route('/seats/:id').delete((req, res) => {
  db.seats = db.seats.filter(
    (element) => element.id !== parseInt(req.params.id)
  );

  return res.json({ message: 'OK' });
});

module.exports = router;