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


module.exports = app;