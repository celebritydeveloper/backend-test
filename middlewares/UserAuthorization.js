"use strict";
const { sendResponse } = require("../helpers/ResponseHelper");
const { User } = require("../database/models/User");


//checks if user type is permitted on route
module.exports = async (req, res, next) => {
    try {
        if (req.body.user.user_type != process.env.USER_TYPE) {
            return sendResponse(req, res, 401, true, false, `Unauthorized!`);
        }

        let user_details = await User.findOne({ _id: req.body.user['user_id']  });

        if (!user_details) {
            return sendResponse(req, res, 401);
        }

        next();

    } catch (err) {
        console.log(err)
        return sendResponse(req, res, 500, err);
    }
}