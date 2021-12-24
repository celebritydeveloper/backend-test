"use strict"

//Required Modules
require('dotenv').config();
process.env.TZ = 'Africa/Lagos'

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const { sendResponse } = require("./helpers/ResponseHelper");
const userRoutes = require('./routes/UserRoutes');
const adminRoutes = require('./routes/AdminRoutes');


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


//connection to routes
app.get('/', (req, res) => {
    sendResponse(req, res, 200, false, true, "Welcome to Shopping Cart");
})

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


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