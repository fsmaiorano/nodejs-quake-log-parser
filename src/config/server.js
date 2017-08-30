const consign = require('consign');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('./cors');

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors);

consign()
    .include('src/controllers')
    .include('src/routes')
    .include('src/config/appSettings.js')
    .into(server);

module.exports = server;
