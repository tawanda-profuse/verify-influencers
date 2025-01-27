const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Get user details by username
const getUserDetails = async (username) => {
  try {
    const user = await twitterClient.v2.userByUsername(username, {
      'user.fields': 'public_metrics',
    });
    return {
      id: user.data.id,
      name: user.data.name,
      username: user.data.username,
      followers: user.data.public_metrics.followers_count,
    };
  } catch (error) {
    console.error('Error fetching Twitter user details:', error);
    return null;
  }
};

module.exports = { getUserDetails };
