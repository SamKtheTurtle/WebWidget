var express = require('express');
var router = express.Router();
// we import our Artist controller
var Artist = require('../controllers/Artist.controller.js');

/* GET Artists listing. */
router.get('/', Artist.findAll);

/* GET one Artist */
router.get('/:ArtistId', Artist.findOne);

/* DELETE  one Artist */
router.delete('/:ArtistId', Artist.delete);

/* UPDATE  one Artist */
router.post('/:ArtistId', Artist.update);

/* CREATE  one Artist */
router.put('/', Artist.create);

module.exports = router;
