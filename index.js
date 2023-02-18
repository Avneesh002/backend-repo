const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

const { connection } = require("./configs/db");
const { userRouter } = require("./Routers/user.router");
const { todoRouter } = require("./Routers/todo.router");
const { authentication } = require("./Middleware/authentication.middleware.");

const connectDB = async () => {
  try {
    await connection;
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("THIS IS YOUR HOMEPAGE");
});

app.use("/users", userRouter);

app.use(authentication);
app.use("/todos", todoRouter);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server is running on ${process.env.PORT} port`);
  });
});
