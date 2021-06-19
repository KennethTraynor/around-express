const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/', (req, res) => {
  fs.readFile(path.join('data', 'cards.json'), { encoding: 'utf-8' })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      res.status(500).send({ 'message': 'Internal Server Error' });
      console.log(err);
    });
});

module.exports = router;
