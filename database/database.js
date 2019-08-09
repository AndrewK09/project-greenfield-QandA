const { Pool } = require('pg');

const config = require('../config/config.js');

const db = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.dbDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});

//TODO: add on error handler

module.exports = db;
