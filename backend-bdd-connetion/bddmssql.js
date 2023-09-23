// Import the mssql module
const mssql = require("mssql");

// Configuration for connecting to the SQL Server database
const sqlConfig = {
  user: "sa",
  password: "my-s3cr3t", // password has to be minumum 8 characters
  database: "master",
  server: "localhost",
  pool: {
    min: 0, // Minimum number of connections in the pool
    max: 10, // Maximum number of connections in the pool
    idleTimeoutMillis: 30000, // Connection timeout in milliseconds
  },
  options: {
    encrypt: true, // Encrypt the connection
    trustServerCertificate: true, // Trust the server certificate
  },
};

/**
 * Executes a SQL query on the SQL Server database.
 *
 * @param {string} sql - The SQL query string.
 * @returns {Promise<Object>} - A promise that resolves with the query result.
 */
async function query(sql) {
  try {
    // Connect to the SQL Server database using the provided configuration
    await mssql.connect(sqlConfig);

    // Execute the SQL query and store the results
    const results = await mssql.query(sql);

    return results;
  } catch (err) {
    // Return the error as a stringified JSON object
    return { err: JSON.stringify(err) };
  }
}

// Test the query function with a sample SQL query
query("SELECT * FROM Customers")
  .then((res) => {
    console.log(res); // Log the results to the console
  })
  .catch((err) => {
    console.log(err); // Log any errors to the console
  });

// Export the sqlConfig for use in other modules
module.exports = sqlConfig;
