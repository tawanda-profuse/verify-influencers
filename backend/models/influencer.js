const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema({
  name: String,
  twitterUserName: String,
  followers: Number,
  profilePhoto: String,
  website: String,
  bio: String,
  yearlyRevenue: Number,
  products: [String],
  claims: [
    {
      title: String,
      verificationStatus: String,
      date: Date,
      category: String,
      aiAnalysis: String,
      trustScore: Number,
      researchLink: String,
    },
  ],
});

module.exports = mongoose.model('Influencer', influencerSchema);