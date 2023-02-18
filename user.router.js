const express = require("express");
const { userModel } = require("./Models/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (error) {
    res.send({ error_msg: error });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    if (!name || !email || !pass) {
      res.send({ msg: "please give required info" });
    } else {
      bcrypt.hash(pass, 4, async function (err, hash) {
        const user = new userModel({ name, email, pass: hash });
        await user.save();
        res.send({ msg: "User successfully registered" });
      });
    }
  } catch (err) {
    res.send("Error : ", err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await userModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, function (err, result) {
        if (result) {
          let token = jwt.sign({ userId: user[0]._id }, "masai");
          res.send({ msg: "User successfully logged in", token });
        } else {
          res.send({ msg: "enter right Credentials" });
        }
      });
    } else {
      res.send({ msg: "enter right Credentials" });
    }
  } catch (error) {
    res.send("Error : ", error);
  }
});

module.exports = { userRouter };
