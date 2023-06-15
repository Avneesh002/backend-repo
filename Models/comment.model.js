const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  name: String,
  post: String,
  content: { type: String, required: true },
});

const commentModel = mongoose.model("Comment", commentSchema);

module.exports = { commentModel };
