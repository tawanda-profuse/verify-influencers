require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const leaderboardRoutes = require("./routes/leaderBoardRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/", (req, res) => {
  res.send("Health Advice Verifier API");
});

module.exports = app;
