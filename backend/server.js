require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Influencer = require("./models/influencer");
const List = require("./models/list");

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
app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("Mongoose Error", error));

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Successful response" });
});

app.get("/test", async (req, res) => {
  try {
    const statsMessage = (user, claims) => {
      return `Analyze this Twitter user's posts or any other information available online and provide the following information: products and yearly revenue".
      
      ### Twitter User: ${user?.username} ###
      ### Person name: ${user?.name} ###
  
      ${claims && `Claims: ${claims}`}
  
      Please return your data in JSON format. Do not include any other letters or characters except what I have requested. Only generate a maximum of 5 products and below based on what you find. Ensure that your output is in the following format with these exact property names:
  
      {
        "yearlyRevenue": 50000,
        "products": ["Product 1", "Product 2", "Product 3"]
      }
  
      If you cannot find the information, return 0 for yearlyRevenue and an empty array for products.
  
      - Products refers to any products that the health influencer sells or promotes. Return this as an array of strings e.g. ["Product 1", "Product 2", "Product 3"]
      - Yearly revenue refers to the estimated yearly revenue of the influencer. If you cannot find the information, return 0.
      `;
    };
    const user = {
      name: 'Sarah Kliff',
      username: 'sarahkliff'
    }
    const claims = [
      {
        "title": "High Drug Prices Are A Major Concern For Americans",
        "verificationStatus": "Verified",
        "date": {
          "$date": "2023-09-01T00:00:00.000Z"
        },
        "category": "Healthcare Costs",
        "source": "twitter.com/sarahkliff/status/XXXX",
        "aiAnalysis": "This claim is supported by a survey which found that Americans across party lines worry about drug costs. It's a top concern for Americans, with 79% saying drug prices are unreasonable.",
        "trustScore": 85,
        "researchLink": "https://www.pewtrusts.org/en/trend/health-care-costs/Americans-on-Health-Care-Costs-and-Quality-of-Care-2022",
        "_id": {
          "$oid": "679a6c15af31c9b5e5b2682e"
        }
      },
      {
        "title": "Americans Want The Government To Negotiate Drug Prices",
        "verificationStatus": "Verified",
        "date": {
          "$date": "2023-09-01T00:00:00.000Z"
        },
        "category": "Healthcare Policy",
        "source": "twitter.com/sarahkliff/status/XXXX",
        "aiAnalysis": "A Kaiser Family Foundation poll found that 88% of Americans support allowing Medicare to negotiate lower drug prices, a policy proposal that has bipartisan support.",
        "trustScore": 90,
        "researchLink": "https://www.kff.org/health-costs/poll-finding/kff-august-2022-health-tracking-poll-methodology/",
        "_id": {
          "$oid": "679a6c15af31c9b5e5b2682f"
        }
      },
      {
        "title": "Drug Price Negotiation Could Save Medicare Billions",
        "verificationStatus": "Questionable",
        "date": {
          "$date": "2023-09-01T00:00:00.000Z"
        },
        "category": "Healthcare Costs",
        "source": "twitter.com/sarahkliff/status/XXXX",
        "aiAnalysis": "While it's true that drug price negotiation could lead to significant savings for Medicare, the actual amount saved depends on various factors and policy implementations.",
        "trustScore": 60,
        "researchLink": "https://www.commondreams.org/news/2022/08/16/allowing-medicare-negotiate-drug-prices-could-save-taxpayers-299-billion-10-years-study-finds",
        "_id": {
          "$oid": "679a6c15af31c9b5e5b26830"
        }
      },
      {
        "title": "High Insulin Prices Are A Result Of Manufacturer Price Increases",
        "verificationStatus": "Verified",
        "date": {
          "$date": "2023-09-01T00:00:00.000Z"
        },
        "category": "Pharmaceuticals",
        "source": "twitter.com/sarahkliff/status/XXXX",
        "aiAnalysis": "A study found that insulin prices in the US increased by more than 1500% between 2002 and 2016, primarily due to manufacturers raising prices, not R&D costs.",
        "trustScore": 80,
        "researchLink": "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1002248",
        "_id": {
          "$oid": "679a6c15af31c9b5e5b26831"
        }
      },
      {
        "title": "Capping Insulin Costs Could Provide Significant Savings",
        "verificationStatus": "Verified",
        "date": {
          "$date": "2023-09-01T00:00:00.000Z"
        },
        "category": "Healthcare Policy",
        "source": "twitter.com/sarahkliff/status/XXXX",
        "aiAnalysis": "Capping insulin costs at $35 per month could lead to substantial savings for patients, as out-of-pocket costs for insulin have increased significantly in recent years.",
        "trustScore": 75,
        "researchLink": "https://www.healthaffairs.org/doi/full/10.1377/hlthaff.2020.00733",
        "_id": {
          "$oid": "679a6c15af31c9b5e5b26832"
        }
      },
      {
        "title": "High Drug Prices Are A Barrier To Adherence",
        "verificationStatus": "Verified",
        "date": {
          "$date": "2023-09-01T00:00:00.000Z"
        },
        "category": "Medication Adherence",
        "source": "twitter.com/sarahkliff/status/XXXX",
        "aiAnalysis": "Research shows that high drug prices can lead to non-adherence, with patients skipping doses or not filling prescriptions due to cost concerns, impacting their health outcomes.",
        "trustScore": 90,
        "researchLink": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5537610/",
        "_id": {
          "$oid": "679a6c15af31c9b5e5b26833"
        }
      },
      {
        "title": "Drug Coupons Don't Always Lower Patient Costs",
        "verificationStatus": "Verified",
        "date": {
          "$date": "2023-09-01T00:00:00.000Z"
        },
        "category": "Pharmaceuticals",
        "source": "twitter.com/sarahkliff/status/XXXX",
        "aiAnalysis": "Drug coupons offered by manufacturers may not always lower patient costs, as they often apply to copays, not the actual drug price, and may not be usable with insurance.",
        "trustScore": 70,
        "researchLink": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4711240/",
        "_id": {
          "$oid": "679a6c15af31c9b5e5b26834"
        }
      },
      {
        "title": "High Drug Prices Impact Patient Health Outcomes",
        "verificationStatus": "Verified",
        "date": {
          "$date": "2023-09-01T00:00:00.000Z"
        },
        "category": "Healthcare Costs",
        "source": "twitter.com/sarahkliff/status/XXXX",
        "aiAnalysis": "High drug prices can lead to worse health outcomes as patients may skip doses, not fill prescriptions, or delay treatment due to cost concerns, impacting their overall health.",
        "trustScore": 85,
        "researchLink": "https://www.nejm.org/doi/full/10.1056/NEJMp1900410",
        "_id": {
          "$oid": "679a6c15af31c9b5e5b26835"
        }
      },
      {
        "title": "Value-Based Drug Pricing Could Improve Affordability",
        "verificationStatus": "Questionable",
        "date": {
          "$date": "2023-09-01T00:00:00.000Z"
        },
        "category": "Healthcare Policy",
        "source": "twitter.com/sarahkliff/status/XXXX",
        "aiAnalysis": "Value-based pricing, which ties drug prices to their effectiveness, could improve affordability, but it's complex and may not always result in lower prices.",
        "trustScore": 50,
        "researchLink": "https://www.healthaffairs.org/doi/full/10.1377/hlthaff.2016.0943",
        "_id": {
          "$oid": "679a6c15af31c9b5e5b26836"
        }
      },
      {
        "title": "Drug Price Transparency Is Key To Lowering Costs",
        "verificationStatus": "Verified",
        "date": {
          "$date": "2023-09-01T00:00:00.000Z"
        },
        "category": "Healthcare Policy",
        "source": "twitter.com/sarahkliff/status/XXXX",
        "aiAnalysis": "Increasing drug price transparency can help lower costs by shedding light on price increases and holding manufacturers accountable, aiding policy interventions.",
        "trustScore": 75,
        "researchLink": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6052264/",
        "_id": {
          "$oid": "679a6c15af31c9b5e5b26837"
        }
      }
    ]
    const message = statsMessage(user, claims);
    const details = await cohereAIDiscover(message);
    console.log(JSON.parse(details));
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

    const statsMessage = (user, claims) => {
      return `Analyze this Twitter user's posts or any other information available online and provide the following information: products${
        revenueAnalysis && " and yearly revenue"
      }.
      
      ### Twitter User: ${user?.username} ###
      ### Person name: ${user?.name} ###
  
      ${claims && `Claims: ${claims}`}
  
      Please return your data in JSON format. Do not include any other letters or characters except what I have requested. Only generate a maximum of ${products} products and below based on what you find. Ensure that your output is in the following format with these exact property names:
  
      {
        "yearlyRevenue": 50000,
        "products": ["Product 1", "Product 2", "Product 3"]
      }
  
      If you cannot find the information, return 0 for yearlyRevenue and an empty array for products.
  
      - Products refers to any products that the health influencer sells or promotes. Return this as an array of strings e.g. ["Product 1", "Product 2", "Product 3"]
      - Yearly revenue refers to the estimated yearly revenue of the influencer. If you cannot find the information, return 0.
      `;
    };

    // If the researchType === 'discover'
    if (researchType === "discover") {
      const listData = await List.find();
      const fullList = listData.map((item) => item.username);
      const generatedInfluencers = await cohereGenerateInfluencers(fullList);
      if (!generatedInfluencers) {
        return res
          .status(500)
          .json({ message: "Failed to retrieve influencer data." });
      }

      if (!Array.isArray(generatedInfluencers)) {
        return res
          .status(500)
          .json({ message: "Unexpected API response format." });
      }
      console.log("Generated influencers: ", generatedInfluencers);
      for (item of generatedInfluencers) {
        // Avoid adding existing data
        if (!fullList.includes(item)) {
          const list = new List({ username: item });
          await list.save();
        }
      }

      const twitterRateLimit = 3; // Free tier has a limit of 3 API requests every 15 minutes
      const influencer = new Influencer();
      const influencerList = await Influencer.find().select("twitterUserName");

      const allInfluencers = influencerList.map((user) =>
        user.twitterUserName.toLowerCase()
      );

      for (let i = 0; i < twitterRateLimit; i++) {
        // Avoid duplicates in the database
        if (!allInfluencers.includes(generatedInfluencers[i].toLowerCase())) {
          const user = await getUserDetails(generatedInfluencers[i]);
          let claims = [];

          // Insert the response into the database
          if (user) {
            console.log("Twitter user: ", user);
            if (user?.tweets) {
              claims = await generateClaims(
                user?.username,
                user?.tweets,
                numberOfClaims,
                verifyWithScientificJournals,
                journals,
                notes,
                dateRange
              );
            }
            influencer.name = user?.name;
            influencer.twitterUserName = user?.username;
            influencer.followers = user?.followers;
            influencer.bio = user?.bio;
            influencer.profilePhoto = user?.profilePhoto?.replace(
              "_normal",
              ""
            );
            influencer.website = user?.url;
            influencer.claims = claims || [];

            const message = statsMessage(user, claims);
            const details = await cohereAIDiscover(message);
            influencer.yearlyRevenue = details?.yearlyRevenue;
            influencer.products = details?.products;
            await influencer.save();
            console.log("Health Influencer: ", influencer);
          } else {
            console.log("Twitter user not found");
          }
        } else {
          console.log("User already exists in database");
        }
      }
    } else {
      // Search twitter for the input influencers name
      const searchMessage = `What is the Twitter user name of ${influencerName}? Only return the user name in your response and do not include anything else. If you cannot find their username, return nothing.`;
      const twitterUsernameResponse = await cohereAIDiscover(searchMessage);

      if (twitterUsernameResponse) {
        console.log("Twitter user: ", twitterUsernameResponse);
        const user = await getUserDetails(twitterUsernameResponse);
        let claims = [];
        if (user) {
          if (user.tweets) {
            claims = await generateClaims(
              user?.username,
              user?.tweets,
              numberOfClaims,
              verifyWithScientificJournals,
              journals,
              notes,
              dateRange
            );
          }

          // Avoid duplicates in the database
          const existingInfluencer = await Influencer.findOne({
            twitterUserName: user?.username,
          });
          // Insert the response into the database
          if (!existingInfluencer) {
            const influencer = new Influencer();
            influencer.name = user?.name;
            influencer.twitterUserName = user?.username;
            influencer.followers = user?.followers;
            influencer.profilePhoto = user?.profilePhoto?.replace(
              "_normal",
              ""
            );
            influencer.website = user?.url;
            influencer.bio = user?.bio;
            influencer.claims = claims || [];

            const message = statsMessage(user, claims);
            const details = await cohereAIDiscover(message);
            influencer.yearlyRevenue = details?.yearlyRevenue;
            influencer.products = details?.products;
            await influencer.save();
            console.log("Health Influencer: ", influencer);
          }
        }
      } else {
        console.log("Nothing has been found for that search query"),
          res.status(404).send({
            message: "Nothing has been found for that search query",
          });
      }
    }

    res.status(200).json({
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

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(
      `Server running on http://localhost:${port}. Using ${
        process.env.MONGODB_URL.includes("mongodb+srv")
          ? "production"
          : "development"
      } database`
    );
  });
}

// Export the app for serverless function in production (Vercel)
module.exports = app;
