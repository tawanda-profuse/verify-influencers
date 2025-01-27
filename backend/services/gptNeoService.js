const { OpenAIApi } = require("openai");

// Initialize OpenAI configuration (no need for Configuration class)
// const openai = new OpenAIApi({
//   apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your .env file
// });
const openai = {}

const analyzeClaim = async (claim) => {
  try {
    const prompt = `Analyze the following Twitter claim and provide:
    1. A trust score (0-100).
    2. A brief AI-based analysis.
    3. A verification status (Verified, Questionable, Debunked).
    Claim: "${claim}"`;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert social media claim verifier.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
    });

    const result = response.data.choices[0].message.content;

    // Parse the response
    const [trustScore, analysis, status] = result
      .split("\n")
      .filter((line) => line.includes(":"))
      .map((line) => line.split(":")[1].trim());

    return {
      trustScore: parseInt(trustScore, 10),
      aiAnalysis: analysis,
      status,
    };
  } catch (error) {
    console.error("Error analyzing claim:", error.message);
    return null;
  }
};

const generateInfluencers = async () => {
  try {
    const prompt =
      "Create a list of health influencers from Twitter. Return the list as an array of their Twitter user names.";

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert social media claim verifier.",
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 200,
    });

    const result = response.data.choices[0].message.content;
    return result;
  } catch (error) {
    console.error("Error: ", error);
    return null;
  }
};

module.exports = { analyzeClaim, generateInfluencers };
