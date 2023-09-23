// connected with server appbddmysql.js

import React, { useState } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [tableName, setTableName] = useState<string>("Orders");
  const [tableData, setTableData] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const searchCustomers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/search-customers?q=${searchTerm}`
      );
      if (response.data && response.data.length > 0) {
        setResults(response.data);
      } else {
        setError("No results found.");
      }
    } catch (error) {
      setError("Error fetching search results.");
      console.error("Error fetching search results:", error);
    }
  };

  const visitTable = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/table/${tableName}`
      );
      if (response.data && response.data.length > 0) {
        setTableData(response.data);
      } else {
        setError(`No data found for table ${tableName}.`);
      }
    } catch (error) {
      setError("Error fetching table data.");
      console.error("Error fetching table data:", error);
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: "##1E5218",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}>
      <h2 style={{ color: "#333" }}>Search Customers</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by Customer ID or Contact Name"
        style={{
          width: "20%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      />
      <button
        onClick={searchCustomers}
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          backgroundColor: "#EEC86A ",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
        Search
      </button>
      {results.length > 0 && (
        <ul style={{ marginTop: "20px", listStyleType: "none", padding: 0 }}>
          {results.map((customer) => (
            <li
              key={customer.CustomerID}
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                marginBottom: "10px",
                borderRadius: "5px",
              }}>
              {customer.CustomerID} - {customer.CompanyName}
            </li>
          ))}
        </ul>
      )}

      <h2 style={{ color: "#333", marginTop: "30px" }}>Visit Other Tables</h2>
      <select
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        style={{ padding: "10px", fontSize: "16px", marginRight: "10px" }}>
        <option value="Orders">Orders</option>
        <option value="Products">Products</option>
        <option value="Categories">Categories</option>
        {/* Add other table names as options here */}
      </select>
      <button
        onClick={visitTable}
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
        Visit Table
      </button>
      {tableData.length > 0 && (
        <ul style={{ marginTop: "20px", listStyleType: "none", padding: 0 }}>
          {tableData.map((row, index) => (
            <li
              key={index}
              style={{
                padding: "10px",
                backgroundColor: "#fff",
                marginBottom: "10px",
                borderRadius: "5px",
              }}>
              {JSON.stringify(row)}
            </li>
          ))}
        </ul>
      )}

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </div>
  );
}

export default App;
