const user = require('../models/user');

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500).send({ message: 'Internal Server Error' }));
};

module.exports.getUser = (req, res) => {
  user.findById(req.params.userId)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'User Not Found' });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid ID' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  user.create({ name, about, avatar })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid Syntax' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  user.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'User Not Found' });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid Syntax' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid ID' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  user.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: 'User Not Found' });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Invalid Syntax' });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: 'Invalid ID' });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
};
