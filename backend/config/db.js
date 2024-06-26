const mongoose = require('mongoose');

const connectToMongoDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Database connection successful!");
    })
    .catch((e) => {
      console.log("Failed to connect to database!", e);
    });
};

module.exports = connectToMongoDB;
