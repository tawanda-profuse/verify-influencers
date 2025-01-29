require("dotenv").config();
const {
  CohereClientV2,
  CohereTimeoutError,
  CohereError,
} = require("cohere-ai");

const cohereGenerateInfluencers = async () => {
  try {
    const cohere = new CohereClientV2({
      token: process.env.COHERE_API_KEY,
    });

    const response = await cohere.chat({
      model: "command-r-plus",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are helping to build a revolutionary tool that helps people navigate the wild world of online health advice. With so many “experts” out there, it’s hard to know who to trust. Our platform should verify health claims from popular influencers using credible scientific research. The end goal is simple: make it easier for people to find honest, evidence-based guidance.",
        },
        {
          role: "user",
          content:
            "Generate a list of 10 health influencers from real Twitter user accounts and return a JSON array of their Twitter user names. Just return the JSON array and nothing else in your response",
        },
      ],
    });

    return response.message.content[0].text;
  } catch (error) {
    if (error instanceof CohereTimeoutError) {
      console.log("Request timed out", error);
    } else if (error instanceof CohereError) {
      // catch all errors
      console.log(err.statusCode);
      console.log(err.message);
      console.log(err.body);
    }
  }
};

const cohereAIDiscover = async (message) => {
  try {
    const cohere = new CohereClientV2({
      token: process.env.COHERE_API_KEY,
    });

    const response = await cohere.chat({
      model: "command-r-plus",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are helping to build a revolutionary tool that helps people navigate the wild world of online health advice. With so many “experts” out there, it’s hard to know who to trust. Our platform should verify health claims from popular influencers using credible scientific research. The end goal is simple: make it easier for people to find honest, evidence-based guidance.",
        },
        { role: "user", content: message },
      ],
    });

    return response.message.content[0].text;
  } catch (error) {
    if (error instanceof CohereTimeoutError) {
      console.log("Request timed out", error);
    } else if (error instanceof CohereError) {
      // catch all errors
      console.log(err.statusCode);
      console.log(err.message);
      console.log(err.body);
    }
  }
};

const generateClaims = async (user, claims) => {
  try {
    const cohere = new CohereClientV2({
      token: process.env.COHERE_API_KEY,
    });

    const response = await cohere.chat({
      model: "command-r-plus",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are helping to build a revolutionary tool that helps people navigate the wild world of online health advice. With so many “experts” out there, it’s hard to know who to trust. Our platform should verify health claims from popular influencers using credible scientific research. The end goal is simple: make it easier for people to find honest, evidence-based guidance.",
        },
        {
          role: "user",
          content: `Generate an array of claims based on the Tweets below for the Twitter profile with the user name of ${user}:
          
          ${claims}.
          
          Return the array of claims in JSON format. Just return the array and nothing else in your response. Do not include any other letters or characters except what I have requested. Ensure that your output is in the following format with these exact property names:

          ### Example JSON Format:
          [
            {
              title: String,
              verificationStatus: String,
              date: Date,
              category: String,
              source: String,
              aiAnalysis: String,
              trustScore: Number,
              researchLink: String,
            },
          ]

          - title: The title of the claim. Generate a suitable title based on the text of the Tweet.
          - verificationStatus: The verification status of the claim. Use your discretion to determine a verification status. Choose between "Verified", "Questionable", or "Debunked".
          - date: The date the Tweet was created.
          - category: The category of the claim. Generate a suitable category based on the text of the Tweet.
          - source: The URL of the Tweet.
          - aiAnalysis: Provide a short analysis of the claim using a maximum of 80 words.
          - trustScore: Based on your analysis, generate a trust score as a percentage. Assign a value between 0 and 100 based on your analysis. Use your discretion to determine the trust score.
          - researchLink: Provide a URL to the research that supports the claim. If the claim is debunked, provide a URL to the debunking research.
          `,
        },
      ],
    });

    return response.message.content[0].text;
  } catch (error) {}
};

module.exports = {
  cohereAIDiscover,
  cohereGenerateInfluencers,
  generateClaims,
};
