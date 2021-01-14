const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller')

router.get('/concerts', ConcertController.getAll);
router.get('/concerts/random', ConcertController.getRandom);
router.get('/concerts/:id', ConcertController.getById);
router.post('/concerts', ConcertController.addNew);
router.put('/concerts/:id', ConcertController.change);
router.delete('/concerts/:id', ConcertController.deleteById);

// Module 30.5
router.get('/concerts/performer/:performer', ConcertController.getByPerformer);
router.get('/concerts/genre/:genre', ConcertController.getByGenre);
router.get('/concerts/price/day/:day', ConcertController.getByDay);
router.get('/concerts/price/:price_min/:price_max', ConcertController.getByPrice);

module.exports = router;