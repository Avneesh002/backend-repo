const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  name: String,
  post: String,
  content: String,
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = { commentModel };
