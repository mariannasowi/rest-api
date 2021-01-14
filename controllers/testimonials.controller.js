const sanitize = require('mongo-sanitize');
const Testimonial = require('../models/Testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find({}));
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const tes = await Testimonial.findOne().skip(rand);
    if (!tes) res.status(404).json({message: 'Not found'});
    else res.json(tes);
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.getById = async (req, res) => {
  try {
    const tes = await Testimonial.findById(req.params.id);
    if (!tes) res.status(404).json({message: 'Not found'});
    else res.json(tes);
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.addNew = async (req, res) => {
  const {author, text} = req.body;
  try {
    if (!text || !text.length || !author || !author.length) throw new Error('data is invalid!');
    else {
      const cleanAuthor = sanitize(author);
      const cleanText = sanitize(text);
      const newTestimonial = new Testimonial({author: cleanAuthor, text: cleanText});
      await newTestimonial.save();
      res.status(201).json({message: 'OK'});
    }
  } 
  catch (err) {
    res.status(500).json({message: 'Something went wrong...'});
  }
};

exports.change = async (req, res) => {
  const {author, text} = req.body;
  try {
    const tes = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {$set: {author: author, text: text}},
      {new: true});
    if (!tes) res.status(404).json({message: 'Not found'});
    else res.json(tes);
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};

exports.deleteById = async (req, res) => {
  try {
    const tes = await (Testimonial.findById(req.params.id));
    if (tes) {
      await Testimonial.deleteOne({_id: req.params.id});
      res.json(tes);
    }
    else res.status(404).json({message: 'Not found...'});
  }
  catch (err) {
    res.status(500).json({message: err});
  }
};