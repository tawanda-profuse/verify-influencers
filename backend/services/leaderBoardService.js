const { OpenAI } = require("openai");

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use your OpenAI API key
});

/**
 * Function to generate a trust score and verification status using OpenAI
 * @param {string} claim - The claim to analyze.
 * @returns {Object} Trust score, AI analysis, and status.
 */
const analyzeClaim = async (claim) => {
  try {
    const prompt = `
    Analyze the following claim and provide:
    1. A trust score (0-100).
    2. A brief AI-based analysis.
    3. A verification status (Verified, Questionable, Debunked).
    Claim: "${claim}"
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const [trustScore, analysis, status] = response.choices[0].message.content
      .trim()
      .split("\n");

    return {
      trustScore: parseInt(trustScore.split(":")[1].trim(), 10),
      aiAnalysis: analysis.split(":")[1].trim(),
      status: status.split(":")[1].trim(),
    };
  } catch (error) {
    console.error("Error analyzing claim:", error.message);
    return null;
  }
};

/**
 * Generate leaderboard data
 * @returns {Object} Leaderboard JSON data.
 */
const generateLeaderboard = async () => {
  const influencers = [
    {
      rank: 1,
      name: "Dr. Peter Attia",
      category: "Medicine",
      profilePictureUrl: "https://example.com/peter.png",
      categories: ["Neuroscience", "Sleep", "Performance", "Stress Management"],
      followers: 100000,
      verifiedClaims: 200,
      recommendedProducts: 10,
      yearlyRevenue: 50000,
      claims: [
        "Morning light exposure affects cortisol rhythms",
        "Sleeping less than 6 hours increases risk of heart disease",
        "Fasting improves mental clarity and focus",
        "Morning light exposure affects cortisol rhythms", // Duplicate claim
      ],
    },
  ];

  const results = [];

  for (const influencer of influencers) {
    const uniqueClaims = [...new Set(influencer.claims)]; // Remove duplicate claims
    const analyzedClaims = [];

    for (const claim of uniqueClaims) {
      const analysis = await analyzeClaim(claim);
      if (analysis) {
        analyzedClaims.push({
          title: claim,
          source: "https://example.com",
          trustScore: analysis.trustScore,
          aiAnalysis: analysis.aiAnalysis,
          researchLink: "https://example-journal.com",
          status: analysis.status,
        });
      }
    }

    results.push({
      ...influencer,
      trustScore: Math.floor(
        analyzedClaims.reduce((sum, c) => sum + c.trustScore, 0) /
          analyzedClaims.length
      ),
      trend: "up",
      claims: analyzedClaims,
    });
  }

  return {
    activeInfluencers: 1000,
    claimsVerified: 25000,
    averageTrustScorePercentage: 85,
    influencers: results,
  };
};

module.exports = { generateLeaderboard };
