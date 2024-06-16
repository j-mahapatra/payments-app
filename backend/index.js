const express = require("express");
require('dotenv').config();
const { connectToMongoDB } = require("./config/db");


connectToMongoDB();



