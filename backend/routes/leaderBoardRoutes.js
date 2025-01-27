const express = require("express");
const { generateLeaderboard } = require("../services/leaderboardService");

const router = express.Router();

/**
 * GET /api/leaderboard
 * Generate a leaderboard for health influencers.
 */
router.get("/", async (req, res) => {
  try {
    const leaderboard = await generateLeaderboard();
    res.json({
      message: "Leaderboard generated successfully",
      data: leaderboard,
    });
  } catch (error) {
    console.error("Error generating leaderboard:", error.message);
    res.status(500).json({ error: "Failed to generate leaderboard" });
  }
});

module.exports = router;
