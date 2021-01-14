const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

//routes
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes')

app.use((req, res, next) => {
    req.io = io;
    next();
});

//middleware
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', concertsRoutes); // add concert routes to server
app.use('/api', seatsRoutes);
app.use('/api', testimonialsRoutes);

app.use(express.static(path.join(__dirname + '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((req, res) => {
    res.status(404).json({message: 'Not found...'});
});

// connects our backend code with the database
const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://mariannasowi:<mariannasowi>@cluster0.budel.mongodb.net/<rest-api>?retryWrites=true&w=majority` : 'mongodb://localhost:27017/NewWaveDB';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New socket!');
});

module.exports = server;