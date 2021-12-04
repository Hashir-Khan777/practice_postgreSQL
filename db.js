const Pg = require("pg");

const Pool = new Pg.Pool({
  user: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  host: "localhost",
  port: 5432,
  database: "practicepostgres",
});

module.exports = Pool;
