const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', (req, res) => {
  fs.readFile('./data/users.json', { encoding: 'utf-8' })
    .then((data) => res.status(200).send(data));
});

router.get('/:_id', (req, res) => {
  fs.readFile('./data/users.json', { encoding: 'utf-8' })
    .then((data) => {
      const { _id } = req.params;
      const user = JSON.parse(data).find((u) => u._id === _id);

      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
        return;
      }

      res.status(200).send(user);
    });
});

module.exports = router;
