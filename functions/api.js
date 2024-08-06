// functions/api.js
const express = require("express");
const serverless = require("serverless-http");
const yahooFinance = require("yahoo-finance2").default; // NOTE the .default

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.get("/api", (req, res) => {
  res.json({ message: "Hello API!" });
});
router.get("/hist", async (req, res) => {
  // const results = await yahooFinance.search("TCS.NS");
  try {
    const hist = await yahooFinance.chart("TCS.NS", {
      period1: "2024-08-06",
      interval: "1m",
    });
    console.log(hist);
    res.json(hist["quotes"]);
  } catch (error) {
    res.json({ message: "There is an error" + error + "." });
  }
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
