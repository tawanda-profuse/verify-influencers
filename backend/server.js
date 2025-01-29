require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Influencer = require("./models/influencer");

const {
  cohereAIDiscover,
  cohereGenerateInfluencers,
  generateClaims,
} = require("./services/aiModelService");
const { getUserDetails } = require("./services/twitterService");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("Mongoose Error", error));

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Successful response" });
});

app.get("/test", async (req, res) => {
  try {
    const tweets = [
      {
        text: '@elonmusk You are the "Chosen One". https://t.co/LRRf8g8jQE',
        public_metrics: [Object],
        created_at: "2025-01-28T18:23:29.000Z",
        edit_history_tweet_ids: [Array],
        id: "1884306319202783742",
      },
      {
        text: "@malenchi_alex Install windows!😂",
        public_metrics: [Object],
        created_at: "2025-01-28T15:15:02.000Z",
        edit_history_tweet_ids: [Array],
        id: "1884258894463262795",
      },
      {
        text: "@elonmusk Is this for real?",
        public_metrics: [Object],
        created_at: "2025-01-16T14:40:10.000Z",
        edit_history_tweet_ids: [Array],
        id: "1879901463113286088",
      },
      {
        text:
          "Thank you @Timi471 for writing this helpful article.\n" +
          "\n" +
          "How to Optimize Next.js Web Apps for Better Performance\n" +
          "\n" +
          "https://t.co/jpSdaPOYU5",
        public_metrics: [Object],
        created_at: "2025-01-12T16:20:22.000Z",
        edit_history_tweet_ids: [Array],
        id: "1878477129685274898",
      },
      {
        text:
          "Thank you @ossia for writing this helpful article.\n" +
          "\n" +
          "Major freeCodeCamp Curriculum Updates Now Live in 2025\n" +
          "\n" +
          "https://t.co/Y9DwGUQYrU",
        public_metrics: [Object],
        created_at: "2025-01-05T01:08:27.000Z",
        edit_history_tweet_ids: [Array],
        id: "1875710921190076535",
      },
      {
        text: '@runaway_vol I find it easier to approach a woman I am not romantically interested in. Who else can relate? I have previously approached girls after getting the "signal" and sometimes this has led to a relationship. The girl should definitely show the first sign.',
        public_metrics: [Object],
        created_at: "2025-01-01T14:15:54.000Z",
        edit_history_tweet_ids: [Array],
        id: "1874459538767917333",
      },
      {
        text: "RT @SeanBellring: @runaway_vol by the 22nd century, a technology will be invented that translates “women shooting their shot” hieroglyphics…",
        public_metrics: [Object],
        created_at: "2025-01-01T14:08:48.000Z",
        edit_history_tweet_ids: [Array],
        id: "1874457752569090551",
      },
      {
        text: '@elonmuskADO Their called "Marasha" in Shona',
        public_metrics: [Object],
        created_at: "2025-01-01T13:54:51.000Z",
        edit_history_tweet_ids: [Array],
        id: "1874454242918105520",
      },
      {
        text: "🔔New Blog Post!🔔 To end the year 2024, I've written an article about ECMAScript 2024,  a standard for scripting languages, including JavaScript. Read more here: https://t.co/XCskkO1mKE",
        public_metrics: [Object],
        created_at: "2024-12-28T15:16:06.000Z",
        edit_history_tweet_ids: [Array],
        id: "1873025137433559279",
      },
      {
        text: "Get so bored and read the full software license agreement.🥱",
        public_metrics: [Object],
        created_at: "2024-12-18T16:16:33.000Z",
        edit_history_tweet_ids: [Array],
        id: "1869416469592986069",
      },
    ];
    const claims = await generateClaims("@drewcaveman", tweets);
    console.log(JSON.parse(claims));
    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(500).send({ message: "Error", error });
    console.error("Error: ", error);
  }
});

// API Endpoint to Post research configuration
app.post("/discover", async (req, res) => {
  try {
    const {
      influencerName,
      researchType,
      dateRange,
      numberOfClaims,
      journals,
      products,
      revenueAnalysis,
      verifyWithScientificJournals,
      notes,
    } = req.body;

    // If the researchType === 'discover'
    if (researchType === "discover") {
      const generatedInfluencers = await cohereGenerateInfluencers();
      const influencers = JSON.parse(generatedInfluencers);
      const twitterRateLimit = 3; // Free tier has a limit of 3 API requests every 15 minutes
      const influencer = new Influencer();

      for (let i = 0; i < twitterRateLimit; i++) {
        const user = await getUserDetails(influencers[i]);
        let claims = [];
        if (user.tweets) {
          claims = await generateClaims(user?.username, user?.tweets);
        }

        // Avoid duplicates in the database
        const existingInfluencer = await Influencer.findOne({
          twitterUserName: user?.username,
        });
        if (!existingInfluencer) {
          // Insert the response into the database
          influencer.name = user?.name;
          influencer.twitterUserName = user?.username;
          influencer.followers = user?.followers;
          influencer.bio = user?.bio;
          influencer.profilePhoto = user?.profile_image_url;
          influencer.website = user?.url;
          // influencer.yearlyRevenue = details?.yearlyRevenue;
          // influencer.products = details?.products;
          influencer.claims = claims;
          // await influencer.save();
        }
      }
      console.log("Health Influencer: ", influencer);
    } else {
      // Search twitter for the input influencers name
      const searchMessage = `What is the Twitter user name of ${influencerName}? Only return the user name in your response and do not include anything else. If you cannot find their username, return nothing.`;
      const twitterUsernameResponse = await cohereAIDiscover(searchMessage);
      if (twitterUsernameResponse) {
        const user = await getUserDetails(twitterUsernameResponse);
        let claims = [];
        if (user.tweets) {
          claims = await generateClaims(user?.username, user?.tweets);
        }

        // Avoid duplicates in the database
        const existingInfluencer = await Influencer.findOne({
          twitterUserName: user?.username,
        });
        if (!existingInfluencer) {
          // Insert the response into the database
          const influencer = new Influencer();
          influencer.name = user?.name;
          influencer.twitterUserName = user?.username;
          influencer.followers = user?.followers;
          influencer.profilePhoto = user?.profile_image_url;
          influencer.website = user?.url;
          influencer.bio = user?.bio;
          // influencer.yearlyRevenue = details?.yearlyRevenue;
          // influencer.products = details?.products;
          influencer.claims = claims;
          // await influencer.save();
        }
        console.log("Health Influencer: ", influencer);
      } else {
        console.log("Nothing has been found for that search query"),
        res.status(404).send({
          message: "Nothing has been found for that search query",
        });
      }
    }

    res.status(200).send({
      message: "Submitted successfully",
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send({
      message: "An error has occurred while generating research",
    });
  }
});

// API Endpoint to access the leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const influencers = await Influencer.find();
    res.status(200).send({
      influencers,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send({
      message: "An error has occurred while fetching the leaderboard",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
