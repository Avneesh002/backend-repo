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
    res.send({ msg: "note added successfully", value: true });
  } catch (error) {
    res.send({ msg: error });
  }
});

todoRouter.delete("/delete/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    await todoModel.findByIdAndDelete({ _id: todoId });
    res.send({ msg: "todo deleted successfully", value: true });
  } catch (error) {
    res.send({ msg: error });
  }
});

todoRouter.patch("/update/:id", async (req, res) => {
  const todoId = req.params.id;

  try {
    await todoModel.findByIdAndUpdate(
      { _id: todoId },
      { status: req.body.status }
    );
    res.send({ msg: "todo updated successfully", value: true });
  } catch (error) {
    res.send({ msg: `err ${error}` });
  }
});

todoRouter.get("/", async (req, res) => {
  try {
    const todos = await todoModel.find({ user: req.body.user });
    res.send(todos);
  } catch (error) {
    res.send({ msg: error });
  }
});

module.exports = { todoRouter };
