const express = require("express");

const db = require("./data/db.js");

const server = express();

server.get("/", (req, res) => {
  res.send("Server running for node-api2-project");
});

const port = 5001;
server.listen(port, () => console.log(`\n*** running on port ${port} ***\n`));