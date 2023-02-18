const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: String,
    status: Boolean,
    user: String,
  },
  {
    versionKey: false,
  }
);

const todoModel = mongoose.model("todos", todoSchema);

module.exports = { todoModel };
