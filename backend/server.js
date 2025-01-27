require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const { getUserDetails } = require('./services/twitterService');
const { initializeModel, analyzeClaim, generateInfluencers } = require('./services/gptNeoService');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize GPT-Neo
// initializeModel().then(() => console.log('GPT-Neo Model Loaded.'));

// API Endpoint to Get Leaderboard
// app.get('/leaderboard', async (req, res) => {
//   try {
//     const influencers = await generateInfluencers();

//     const leaderboard = [];

//     for (const username of influencers) {
//       const user = await getUserDetails(username);

//       if (!user) continue;

//       // Example claims for demonstration
//       const claims = [
//         'Mars is the next frontier for humanity.',
//         'Self-discipline is key to success.',
//       ];

//       const analyzedClaims = [];
//       for (const claim of claims) {
//         const analysis = await analyzeClaim(claim);
//         if (analysis) {
//           analyzedClaims.push({
//             claim,
//             ...analysis,
//           });
//         }
//       }

//       leaderboard.push({
//         name: user.name,
//         username: user.username,
//         followers: user.followers,
//         trustScore: Math.floor(
//           analyzedClaims.reduce((sum, c) => sum + c.trustScore, 0) /
//             analyzedClaims.length
//         ),
//         claims: analyzedClaims,
//       });
//     }

//     res.json({ leaderboard });
//   } catch (error) {
//     console.error('Error generating leaderboard:', error.message);
//     res.status(500).json({ error: 'Failed to generate leaderboard.' });
//   }
// });

// API Endpoint to Post research configuration
app.post('/research', async(req, res) => {
  try {
    // {
    //   influencerName: '',
    //   researchType: 'discover',
    //   dateRange: 'All Time',
    //   numberOfClaims: 50,
    //   journals: [ 'The Lancet' ],
    //   products: 10,
    //   revenueAnalysis: false,
    //   verifyWithScientificJournals: false,
    //   notes: ''
    // }
    res.status(200).send({
      message: "Submitted successfully"
    })
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send({
      message: "An error has occurred while generating research"
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
