// functions/api.js
const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/api", (req, res) => {
  res.json({ message: "Hello from API!" });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
