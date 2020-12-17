const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const filterDB = id => (
  db.testimonials.filter(content => content.id == id)
);

router.route('/testimonials').get((req, res) => {
    res.send(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    res.send(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

router.route('/testimonials/:id').get((req, res) => {
    const element = db.testimonials.find(
      (element) => element.id === parseInt(req.params.id)
    );
    res.send(element);
  });

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;

    const testimonial = {
      id: uuidv4(),
      author,
      text,
    };

    db.testimonials.push(testimonial);

    return res.json({ message: 'OK' });
  });

router.route('/testimonials/:id').put((req, res) => {
  filterDB(req.params.id).forEach(content => {
    content.author = req.body.author;
    content.text = req.body.text;
  });

  res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials = db.testimonials.filter(
    (element) => element.id !== parseInt(req.params.id)
  );

    return res.json({ message: 'OK' });
  });

  module.exports = router;