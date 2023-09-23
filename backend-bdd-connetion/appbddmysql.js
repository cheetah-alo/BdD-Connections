const express = require("express");
const mysql = require("mysql8");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "s3cr3t",
  database: "curso-mysql-w2w3",
});

app.use(cors());
app.use(bodyParser.json());

// Endpoint to check the database connection status
app.get("/check-database-connection", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).send("Database connection error");
    } else {
      res.status(200).send("Database connection is up and running");
      connection.release();
    }
  });
});

// Endpoint to search customers by ID or name
app.get("/search-customers", (req, res) => {
  let searchTerm = req.query.q;
  // Add LIMIT 10 to the SQL query
  let sql =
    "SELECT * FROM Customers WHERE CustomerID LIKE ? OR CompanyName LIKE ? LIMIT 5";
  pool.query(sql, [`%${searchTerm}%`, `%${searchTerm}%`], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

// Endpoint to fetch data from other tables
app.get("/table/:tableName", (req, res) => {
  let tableName = req.params.tableName;

  // Ensure table name is one of the allowed tables to prevent SQL injection
  const allowedTables = ["Orders", "Products", "Categories"]; // Add other table names as needed
  if (!allowedTables.includes(tableName)) {
    return res.status(400).send("Invalid table name");
  }

  // Fetch the first 10 records from the specified table
  let sql = `SELECT * FROM ${tableName} LIMIT 5`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
