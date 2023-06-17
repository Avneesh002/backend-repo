const express = require("express");
const leaderboardRoute = express.Router();
const { leaderboardModel } = require("./Models/leaderboard.model");
const { userModel } = require("./Models/user.model");

leaderboardRoute.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const leaderboard = await leaderboardModel.find({ quizId: id });
    res.send({ leaderboard });
  } catch (error) {
    res.send({ error });
  }
});

leaderboardRoute.post("/add", async (req, res) => {
  const user = await userModel.find({ _id: req.body.user });
  req.body.email = user[0].email;

  try {
    const data = new leaderboardModel(req.body);
    await data.save();
    res.send({ msg: "Score added" });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = { leaderboardRoute };
