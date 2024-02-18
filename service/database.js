const { Client } = require("pg");

const dbClient = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "123456",
  database: "postgres",
});

module.exports = dbClient;
