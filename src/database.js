const { Pool } = require("pg");

if (!process.env.DB_NAME) {
  throw new Error(".env configuration missing");
}

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
