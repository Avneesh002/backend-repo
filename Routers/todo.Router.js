const express = require("express");
const jwt = require("jsonwebtoken");
const todoRouter = express.Router();
const { todoModel } = require("../Models/todo.model");
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
    res.send("todo deleted successfully");
  } catch (error) {
    res.send(error);
  }
});

todoRouter.patch("/update/:id", async (req, res) => {
  const todoId = req.params.id;

  const todos = await todoModel.findOne({ _id: todoId });

  if (todos.user !== req.body.user) {
    res.send("You are not authorized");
  } else {
    try {
      await todoModel.findByIdAndUpdate({ _id: todoId }, req.body);
      res.send("todo updated successfully");
    } catch (error) {
      res.send(error);
    }
  }
});

todoRouter.get("/", async (req, res) => {
  const token = req.headers?.authorization?.split(" ")[1];

  const decoded = jwt.verify(token, "masai");
  try {
    const todos = await todoModel.find({ user: decoded.userId });
    res.send(todos);
  } catch (error) {
    res.send(error);
  }
});

module.exports = { todoRouter };
