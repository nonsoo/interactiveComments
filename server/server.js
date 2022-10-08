const express = require("express");
const cors = require("cors");

const app = express();
const port = 5001;
const data = require("./data.json");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.status(200).json({ error: "server is working" });
});

app.get("/api/users", (req, res) => {
  res.status(200).json(data);
});

app.post("/api/reply", (req, res) => {
  const { comment } = req.body;

  data.comments[comment.id - 1].replies.push(comment);

  res.status(200).json({ status: "ok", data });
});

app.listen(port, () => {
  console.log(`server is active on port ${port}`);
});
