"use strict"

//Required Modules
require('dotenv').config();
process.env.TZ = 'Africa/Lagos'

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require('helmet');
const compression = require('compression');
const { sendResponse } = require("./helpers/ResponseHelper");


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(compression());


//connection to routes
app.get('/', (req, res) => {
    sendResponse(req, res, 200, false, true, "Welcome to Shopping Cart");
})

// app.use('/', RateLimiter.regular);
// app.use('/user', Routes.UserRoutes);


// Handle 404
app.use(function (req, res) {
    sendResponse(req, res, 404);
})

//Handle Server Error
app.use(function (error, req, res, next) {
    console.log(error)
    sendResponse(req, res, 500, error);
});


module.exports = app;