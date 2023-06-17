const mongoose = require("mongoose");

const leaderboardSchema = mongoose.Schema({
  user: String,
  email: String,
  score: Number,
  quizId: String,
});

const leaderboardModel = mongoose.model("leaderboard", leaderboardSchema);

module.exports = { leaderboardModel };
