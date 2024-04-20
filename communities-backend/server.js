// server.js
const express = require("express");
const app = express();
const port = 8080; // You can change this port number if needed

// Define a route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});