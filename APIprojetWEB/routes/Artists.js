var express = require('express');
var router = express.Router();
var Artist = require('../controllers/Artist.controller');

/* GET Artists listing. */
router.get('/', Artist.findAll);

module.exports = router;
