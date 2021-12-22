"use strict"
const rateLimit = require('express-rate-limit');

let limiter = {
    regular: rateLimit({
        windowMs: 1000, // 1 seconds minutes
        max: 20 // limit each I
    }),
    login: rateLimit({
        windowMs: 1000, // 1 seconds minutes
        max: 3 // limit each I
    }),
    otp: rateLimit({
        windowMs: 60000, // 60 seconds
        max: 2
    })
}

module.exports = limiter