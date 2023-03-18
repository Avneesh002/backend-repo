const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: "*" }));

const { connection } = require("./configs/db");
const { userRouter } = require("./Routers/user.router");
const { todoRouter } = require("./Routers/todo.router");
const { authentication } = require("./Middleware/authentication.middleware.");

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
