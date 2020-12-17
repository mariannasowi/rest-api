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
  const seatFilter = db.seats.filter(seat => seat.day == req.body.day);
  if(seatFilter.some(seat => seat.seat == req.body.seat)) {
    res.status(403).json({message: 'The slot is already taken...'});
  } else {
    const newId = db.seats[db.seats.length-1].id + 1;
    db.seats.push({
      id: newId,
      day: req.body.day,
      seat: req.body.seat,
      client: req.body.client,
      email: req.body.email,
    });
    es.json({message: 'OK'});
  }
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