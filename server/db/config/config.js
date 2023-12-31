require('dotenv').config()

module.exports = {
  development: {
    username: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
    host: process.env.PGSQL_HOST,
    port: process.env.PGSQL_PORT,
    dialect: "postgres",
    logging: false
  },
  test: {
    username: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
    host: process.env.PGSQL_HOST,
    port: process.env.PGSQL_PORT,
    dialect: "postgres",
    logging: false
  },
  production: {
    username: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
    host: process.env.PGSQL_HOST,
    port: process.env.PGSQL_PORT,
    dialect: "postgres",
    logging: false
  }
}
