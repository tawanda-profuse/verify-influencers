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
    const products = 10;
    const revenueAnalysis = true;
    const user = await getUserDetails("drewcaveman");

    let statsMessage = `Analyze this Twitter user's posts or any other information available online and provide the following information: products ${
      revenueAnalysis && "and yearly revenue"
    }.
    
    ### Twitter User: ${user?.username} ###
    ### Person name: ${user?.name} ###

    ${user.tweets && `Claims: ${user.tweets}`}

    Please return your data in JSON format. Do not include any other letters or characters except what I have requested. Only generate a maximum of ${products} products. Ensure that your output is in the following format with these exact property names:

    {
      "yearlyRevenue": 0,
      "products": []
    }

    If you cannot find the information, return 0 for yearlyRevenue and an empty array for products.

    - Products refers to any products that the influencer sells or promotes.
    - Yearly revenue refers to the estimated yearly revenue of the influencer. If you cannot find the information, return 0.
    `;
    const details = await cohereAIDiscover(statsMessage);
    console.log({
      details: JSON.parse(details),
    });
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

    let statsMessage = `Analyze this Twitter user's posts or any other information available online and provide the following information: products ${
      revenueAnalysis && "and yearly revenue"
    }.
    
    ### Twitter User: ${user?.username} ###
    ### Person name: ${user?.name} ###

    ${claims && `Claims: ${claims}`}

    Please return your data in JSON format. Do not include any other letters or characters except what I have requested. Only generate a maximum of ${products} products. Ensure that your output is in the following format with these exact property names:

    {
      "yearlyRevenue": 0,
      "products": []
    }

    If you cannot find the information, return 0 for yearlyRevenue and an empty array for products.

    - Products refers to any products that the influencer sells or promotes.
    - Yearly revenue refers to the estimated yearly revenue of the influencer. If you cannot find the information, return 0.
    `;

    // If the researchType === 'discover'
    if (researchType === "discover") {
      const generatedInfluencers = await cohereGenerateInfluencers();
      const influencers = JSON.parse(generatedInfluencers);
      const twitterRateLimit = 3; // Free tier has a limit of 3 API requests every 15 minutes
      const influencer = new Influencer();
      const allInfluencers = await Influencer.find()
        .select("twitterUserName")
        .map((user) => user.twitterUserName.toLowerCase());

      for (let i = 0; i < twitterRateLimit; i++) {
        // Avoid duplicates in the database
        if (!allInfluencers.includes(influencers[i].toLowerCase())) {
          const user = await getUserDetails(influencers[i]);
          let claims = [];
          if (user.tweets) {
            claims = await generateClaims(
              user?.username,
              user?.tweets,
              numberOfClaims,
              verifyWithScientificJournals,
              journals
            );
          }

          // Insert the response into the database
          influencer.name = user?.name;
          influencer.twitterUserName = user?.username;
          influencer.followers = user?.followers;
          influencer.bio = user?.bio;
          influencer.profilePhoto = user?.profile_image_url;
          influencer.website = user?.url;
          influencer.claims = claims || [];

          const details = await cohereAIDiscover(statsMessage);
          influencer.yearlyRevenue = details?.yearlyRevenue;
          influencer.products = details?.products;
          await influencer.save();
          console.log("Health Influencer: ", influencer);
        }
      }
    } else {
      // Search twitter for the input influencers name
      const searchMessage = `What is the Twitter user name of ${influencerName}? Only return the user name in your response and do not include anything else. If you cannot find their username, return nothing.`;
      const twitterUsernameResponse = await cohereAIDiscover(searchMessage);
      if (twitterUsernameResponse) {
        const user = await getUserDetails(twitterUsernameResponse);
        let claims = [];
        if (user.tweets) {
          claims = await generateClaims(
            user?.username,
            user?.tweets,
            numberOfClaims,
            verifyWithScientificJournals,
            journals
          );
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
          influencer.claims = claims || [];

          const details = await cohereAIDiscover(statsMessage);
          influencer.yearlyRevenue = details?.yearlyRevenue;
          influencer.products = details?.products;
          await influencer.save();
          console.log("Health Influencer: ", influencer);
        }
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

app.get("/influencers/:id", async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id);

    if (!influencer) {
      return res.status(404).send({ message: "Influencer not found" });
    }

    res.status(200).send({
      influencer,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send({
      message: "An error has occurred while fetching the influencer",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
