const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.SERVER_LINK);

module.exports = { connection };
