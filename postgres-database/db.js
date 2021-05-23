const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "test",
  database: "waterme",
  host: "localhost",
  port: 5432
});

module.exports = pool;
