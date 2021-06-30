const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ 'message': 'Requested resource not found' });
});

app.listen(PORT);
