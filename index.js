const express = require('express')
const app = express()
const port = 3000
require('dotenv').config();
const mongoose = require('mongoose');

// Use the MongoDB URI from the .env file
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log('MongoDB connection error: ', err));

