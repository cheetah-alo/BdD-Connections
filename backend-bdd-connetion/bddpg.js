const { Pool } = require("pg"); // Fixed the typo 'reuiere' to 'require'
const util = require("util");

// Configuration for the PostgreSQL connection pool
const poolPg = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "s3cr3t",
  port: 5432,
});

/**
 * Executes a SQL query on the PostgreSQL database.
 *
 * @param {string} sql - The SQL query string.
 * @param {Array} parameters - The parameters for the SQL query.
 * @returns {Promise<Array>} - A promise that resolves with the query result rows.
 */
function q(sql, parameters) {
  return new Promise((resolve, reject) => {
    poolPg.connect((err, client, done) => {
      if (err) {
        reject(err);
      }

      client.query(sql, parameters, (err, result) => {
        done();
        if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
      });
    });
  });
}

q("SELECT * FROM Customers LIMIT 2", [])
  .then((rows) => {
    console.log(rows);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("--- done ----");
  });

module.exports = {
  q,
};
