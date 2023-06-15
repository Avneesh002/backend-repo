const express = require("express");
const blogRouter = express.Router();
const { blogModel } = require("./Models/blog.model");

blogRouter.get("/", async (req, res) => {
  const title = req.params;
  const regex = new RegExp(title.title, "i");
  try {
    const data = await blogModel.find({ title: regex });
    res.send({ data });
  } catch (error) {
    res.send({ error });
  }
});

blogRouter.post("/add", async (req, res) => {
  let arr = Date().toString().split(" ");
  req.body.date = `${arr[2]}-${arr[1]}-${arr[3]}`;

  try {
    const data = new blogModel(req.body);
    await data.save();
    res.send({ msg: "Blog successfully posted" });
  } catch (error) {
    res.send({ error });
  }
});

blogRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await blogModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ msg: "Updated Successfully" });
  } catch (error) {
    res.send({ error });
  }
});

blogRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await blogModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Deleted Successfully" });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = { blogRouter };
