"use strict";

require('dotenv').config();
var _require = require('pg'),
  Pool = _require.Pool;
var pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});
module.exports = pool;