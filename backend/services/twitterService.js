const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Get user details by username
const waitUntilReset = async (resetTime) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const waitTime = resetTime - currentTime;

  if (waitTime > 0) {
    console.log(`Rate limit reached. Waiting for ${waitTime} seconds...`);
    await new Promise((resolve) => setTimeout(resolve, waitTime * 1000));
  }
};

const getUserDetails = async (username) => {
  try {
    const sanitizedUsername = username.startsWith('@') ? username.slice(1) : username;

    const user = await twitterClient.v2.userByUsername(sanitizedUsername, {
      'user.fields': 'public_metrics,description,profile_image_url,url',
    });

    if(!user){
      console.log(`Twitter user name '${username}' not found.`)
    }

    const tweets = await twitterClient.v2.userTimeline(user.data.id, {
      max_results: 10,
      'tweet.fields': 'created_at,public_metrics,text',
    });

    return {
      id: user.data.id,
      name: user.data.name,
      username: user.data.username,
      followers: user.data.public_metrics.followers_count,
      bio: user.data.description || "Bio not available",
      profilePhoto: user.data.profile_image_url || "",
      url: user.data.url || "",
      tweets: tweets['_realData'].data
    };
  } catch (error) {
    if (error.code === 429) {
      await waitUntilReset(error.rateLimit.reset); // Wait and retry
      return getUserDetails(username);
    }
  }
};


module.exports = { getUserDetails };
