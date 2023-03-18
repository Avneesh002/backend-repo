const express = require("express");
const cors = require("cors");
const app = express();
const { connection } = require("./configs/db");
const { userRouter } = require("./user.router");
const { todoRouter } = require("./todo.Router");
const { authentication } = require("./Middleware/authentication.middleware.");
require("dotenv").config();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/users", userRouter);

app.use(authentication);
app.use("/todos", todoRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(" ------- Server - started ------- db - connected");
  } catch (error) {
    console.log(error);
  }
});
