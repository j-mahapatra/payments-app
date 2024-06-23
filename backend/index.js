const express = require("express");
require('dotenv').config();
const cors = require('cors');
const connectToMongoDB = require("./config/db");
const mainRouter = require("./routes");
const authMiddleware = require("./middlewares/auth-middleware");

const PORT = process.env.PORT ?? 3000;

connectToMongoDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', authMiddleware, mainRouter);


app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});

