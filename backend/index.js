const express = require("express");
require('dotenv').config();
const { connectToMongoDB } = require("./config/db");
const mainRouter = require("./routes");

const PORT = process.env.PORT ?? 3000;

connectToMongoDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1', mainRouter);


app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});

