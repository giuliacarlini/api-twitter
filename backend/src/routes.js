const express = require('express');
const twitterController = require('./twitterController');

const routes = express.Router();

routes.get('/baixarvideo/:id', twitterController.downloadTweet);

module.exports = routes;