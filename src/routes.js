const express = require('express');
const botDownload = require('./botDownloadMP4Copy');

const routes = express.Router();

routes.get('/baixarvideo/:id', botDownload.index);

module.exports = routes;