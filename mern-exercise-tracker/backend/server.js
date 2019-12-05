//Server creation

const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
//Mongoose helps connect to MongoDB database

require ('dotenv').config();
//Create enviroment variables in dotenv file

const app = express();
const port = process.env.PORT || 5000;
//Creates express server

app.use(cors());
app.use(express.json());
//Middleware - allows us to parse JSON

const uri = process.env.ATLAS_URI; //Database URI - Get from the MongoDB dashboard
mongoose.connect(uri, {useNewUrlParser: true, userCreateIndex: true}
); // Passes in the URI - connects to the DB - 1st flag - Nodejs changed rule to parsing - 2nd Flag - deals with MongoDB deprecating JSON

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', userRouter);
//When user uses '/exercise' it will load everything in that file

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
//Starts listening on a certain port