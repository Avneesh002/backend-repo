const express = require("express");
const commentRouter = express.Router();
const { commentModel } = require("./Models/comment.model");

commentRouter.get("/", async (req, res) => {
  try {
    const data = await commentModel.find();
    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
});

commentRouter.post("/add", async (req, res) => {
  try {
    const data = new commentModel(req.body);
    await data.save();
    res.send({ msg: "Comment successfully added" });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = { commentRouter };
