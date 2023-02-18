const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const { connection } = require("./configs/db");
const { userRouter } = require("./Routers/user.router");
const { todoRouter } = require("./Routers/todo.router");
const { authentication } = require("./Middleware/authentication.middleware.");

app.get("/", (req, res) => {
  res.send("THIS IS YOUR HOMEPAGE");
});

app.use("/users", userRouter);

app.use(authentication);
app.use("/todos", todoRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
  console.log(`server is running on ${process.env.PORT} port`);
});
