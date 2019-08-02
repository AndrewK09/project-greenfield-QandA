const Pool = require('pg').Pool;
const { PG_CONFIG } = require('../config/config.js');
const pool = new Pool(PG_CONFIG);

module.exports = pool;
