const express = require('express');
const DownloadbyID = require('./DownloadbyID');

const routes = express.Router();

routes.get('/baixarvideo/:id', DownloadbyID.index);

module.exports = routes;