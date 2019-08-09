const pgp = require('pg-promise')();

const config = require('../config/config.js');

const db = pgp({
  user: config.pgUser,
  host: config.pgHost,
  database: config.dbDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});

//TODO: add on error handler

module.exports = db;
