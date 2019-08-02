const pgp = require('pg-promise')();

const { PG_CONFIG } = require('../config/config.js');
const db = pgp(PG_CONFIG);

module.exports = db;
