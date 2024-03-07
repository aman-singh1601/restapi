const express = require('express');
const fs = require('fs');
require('dotenv').config();

const userRouter = require('./routes/users.js');
const {MongoDbConnect} = require('./connection.js');

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;


const app = express();

app.use(express.urlencoded({extended: false}));

MongoDbConnect(DB_URL);

app.use("/api/users", userRouter);


app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
})