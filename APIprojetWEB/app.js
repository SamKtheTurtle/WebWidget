const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/database.config');


var indexRouter = require('./routes/index');
var ArtistRouter = require('./routes/Artist');
var ArtistsRouter = require('./routes/Artists');

mongoose.connect(config.url, { useNewUrlParser: true });
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/Artist', ArtistRouter);
app.use('/Artists', ArtistsRouter);

module.exports = app;


