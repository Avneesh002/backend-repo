const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  creator: String,
  user: String,
  quizTitle: { type: String, required: true },
  quizDescription: { type: String, required: true },
  questions: [
    {
      title: String,
      answerOptions: [String],
      correctOptions: Number,
    },
  ],
});

const quizModel = mongoose.model("quiz", quizSchema);

module.exports = { quizModel };
