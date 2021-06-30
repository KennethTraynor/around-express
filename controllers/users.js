const user = require('../models/user');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      console.log(err);
      res.status(500).send({ 'message': 'Internal Server Error' });
    });
};

module.exports.getUser = (req, res) => {
  user.findById(req.params.userId)
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      console.log(err);
      if (err.name === '') {
        return res.status(404).send({ 'message': 'User Not Found' });
      }
      return res.status(500).send({ 'message': 'Internal Server Error' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  user.create({ name, about, avatar })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        return res.status(400).send({ 'message': 'Invalid Syntax' });
      }
      return res.status(500).send({ 'message': 'Internal Server Error' });
    });
};
