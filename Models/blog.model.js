const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  username: String,
  user: String,
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  date: String,
  likes: Number,
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = { blogModel };
