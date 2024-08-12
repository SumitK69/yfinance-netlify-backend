// functions/api.js
const express = require("express");
const serverless = require("serverless-http");
const yahooFinance = require("yahoo-finance2").default; // NOTE the .default

const app = express();
const router = express.Router();
app.use(express.json());

const cors = require("cors");
app.use(cors());

router.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

router.post("/hist", async (req, res) => {
  try {
    const { query } = req.body;
    const current_date = new Date().toISOString().split("T")[0];
    console.log("current_date", current_date);

    const hist = await yahooFinance.chart(query, {
      period1: current_date,
      // period2: "2024-08-07",
      interval: "1m",
    });

    const localizedHist = hist["quotes"].map((item) => {
      localizedDate = item["date"].toLocaleString();
      return { ...item, date: localizedDate };
    });

    res.json(localizedHist);
  } catch (error) {
    res.json({ message: "error message: " + error });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;
    const searchresult = await yahooFinance.search(query);
    console.log("searchresult", searchresult["Promise"]);
    res.json(searchresult);
  } catch (error) {
    console.error("Error performing search:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
