var express = require('express');
var router = express.Router();
// we import our Track controller
var Track = require('../controllers/Track.controller.js');

/* GET Track listing. */
router.get('/', Track.findAll);

/* GET one Track */
router.get('/:TrackId', Track.findOne);

/* DELETE  one Track */
router.delete('/:TrackId', Track.delete);

/* UPDATE  one Track */
router.post('/:TrackId', Track.update);

/* CREATE  one Track */
router.put('/', Track.create);

module.exports = router;
