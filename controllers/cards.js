const card = require('../models/card');

module.exports.getCards = (req, res) => {
  card.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ 'message': 'Internal Server Error' });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  card.create({ name, link, owner: req.user._id })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send({ 'message': 'Invalid Syntax' });
      }
      return res.status(500).send({ 'message': 'Internal Server Error' });
    });
};

module.exports.deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      console.log(err);
      if (err.name === '') {
        return res.status(404).send({ 'message': 'Card Not Found' });
      }
      return res.status(500).send({ 'message': 'Internal Server Error' });
    });
};
