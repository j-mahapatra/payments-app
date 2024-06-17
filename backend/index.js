const express = require("express");
require('dotenv').config();
const { connectToMongoDB } = require("./config/db");
const mainRouter = require("./routes");

connectToMongoDB();

const app = express();

app.use('/api/v1', mainRouter);


