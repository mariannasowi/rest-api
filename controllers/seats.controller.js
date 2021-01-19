const Seat = require('../models/Seat.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find({}));
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const sit = await Seat.findOne().skip(rand);
    if (!sit) res.status(404).json({message: 'Not found'});
    else res.json(sit);
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getById = async (req, res) => {
  try {
    const sit = await Seat.findById(req.params.id);
    if (!sit) res.status(404).json({message: 'Not found'});
    else res.json(sit);
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.addNew = async (req, res) => {
  try {
    const bodySanitize = sanitize(req.body);
    const {day, seat, client, email} = bodySanitize;
    const newSeat = new Seat({day: day, seat: seat, client: client, email: email});
    await newSeat.save();
    res.json({message: 'OK'});
  } 
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.change = async (req, res) => {
  const {day, seat, client, email} = req.body;
  try {
    const sit = await Seat.findByIdAndUpdate(
      req.params.id,
      {$set: {day: day, seat: seat, client: client, email: email}},
      {new: true});
    if (!sit) res.status(404).json({message: 'Not found'});
    else res.json(sit);
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.deleteById = async (req, res) => {
  try {
    const sit = await (Seat.findById(req.params.id));
    if (sit) {
      await Seat.deleteOne({_id: req.params.id});
      res.json(sit);
    }
    else res.status(404).json({message: 'Not found...'});
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};