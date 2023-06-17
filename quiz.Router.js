const express = require("express");
const quizRouter = express.Router();
const { quizModel } = require("./Models/quiz.model");
const { userModel } = require("./Models/user.model");
quizRouter.get("/", async (req, res) => {
  try {
    const data = await quizModel.find();
    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
});
quizRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const quiz = await quizModel.find({ _id: id });
    res.send({ quiz });
  } catch (error) {
    res.send({ error });
  }
});

quizRouter.post("/add", async (req, res) => {
  const user = await userModel.find({ _id: req.body.user });

  try {
    req.body.creator = user[0].email;
    const data = new quizModel(req.body);
    await data.save();
    res.send({ msg: "Quiz Added Successfully" });
  } catch (error) {
    res.send({ error });
  }
});

quizRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await quizModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Quiz Deleted Successfully" });
  } catch (error) {
    res.send({ error });
  }
});

quizRouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await quizModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ msg: "Quiz Updated Successfully" });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = { quizRouter };
