var express = require('express');
var router = express.Router();
// we import our Album controller
var Album = require('../controllers/Album.controller.js');

/* GET Album listing. */
router.get('/', Album.findAll);

/* GET one Album */
router.get('/:AlbumId', Album.findOne);

/* DELETE  one Album */
router.delete('/:AlbumId', Album.delete);

/* UPDATE  one Album */
router.post('/:AlbumId', Album.update);

/* CREATE  one Album */
router.put('/', Album.create);

module.exports = router;
