const express = require("express");

const app = express();
const port = 5001;

const data = require("./data.json");

app.get("/api/ping", (req, res) => {
  res.status(200).json({ error: "server is working" });
});

app.get("/api/users", (req, res) => {
  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`server is active on port ${port}`);
});
