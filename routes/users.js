const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', (req, res) => {
  fs.readFile(path.join('data', 'users.json'), { encoding: 'utf-8' })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      res.status(500).send({ 'message': 'Internal Server Error' });
      console.log(err);
    });
});

router.get('/:_id', (req, res) => {
  fs.readFile(path.join('data', 'users.json'), { encoding: 'utf-8' })
    .then((data) => {
      const { _id } = req.params;
      const user = JSON.parse(data).find((u) => u._id === _id);

      if (!user) {
        res.status(404).send({ 'message': 'User ID not found' });
        return;
      }

      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ 'message': 'Internal Server Error' });
      console.log(err);
    });
});

module.exports = router;
