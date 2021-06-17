const router = require('express').Router();
const fs = require('fs').promises;

router.get('/', (req, res) => {
  fs.readFile('./data/cards.json', { encoding: 'utf-8' })
    .then((data) => res.status(200).send(data));
});

module.exports = router;