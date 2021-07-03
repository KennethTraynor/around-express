const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '60dc96514cceda04f80c9562',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT);
