const express = require("express");
const jwt = require("jsonwebtoken");
const todoRouter = express.Router();
const { todoModel } = require("./Models/todo.model");
const Cookies = require("js-cookie");
const { authentication } = require("./Middleware/authentication.middleware.");

todoRouter.get("/alltodo", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.send(todos);
  } catch (error) {
    res.send(error);
  }
});

todoRouter.post("/addtodo", async (req, res) => {
  const payload = req.body;

  try {
    const todo = new todoModel(payload);
    await todo.save();
    res.send("note added successfully");
  } catch (error) {
    res.send(error);
  }
});

todoRouter.delete("/delete/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    await todoModel.findByIdAndDelete({ _id: todoId });
    res.send({ msg: "todo deleted successfully" });
  } catch (error) {
    res.send(error);
  }
});

todoRouter.patch("/update/:id", async (req, res) => {
  const todoId = req.params.id;

  const todos = await todoModel.findOne({ _id: todoId });

  if (todos.user !== req.body.user) {
    res.send({ msg: "You are not authorized" });
  } else {
    try {
      await todoModel.findByIdAndUpdate({ _id: todoId }, req.body);
      res.send({ msg: "todo updated successfully" });
    } catch (error) {
      res.send(error);
    }
  }
});

todoRouter.get("/all", authentication, async (req, res) => {
  // const token = Cookies.get("token");
  console.log(req.body);

  const todos = await todoModel.find({ user: req.body.user });
  res.send(todos);

  // res.send("Hi");
});

module.exports = { todoRouter };
