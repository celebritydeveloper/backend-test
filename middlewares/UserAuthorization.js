"use strict";
const { sendResponse } = require("../helpers/ResponseHelper");
//const Models = require('../database/models');


//checks if user type is permitted on route
module.exports = async (req, res, next) => {
    try {
        if (req.body.user.user_type != process.env.USER_TYPE) {
            return sendResponse(req, res, 401, true, false, `Unauthorized!`);
        }

        // let user_details = await Models.users.findOne({
        //     where: {
        //         id: req.body.user["user_id"]
        //     },
        //     include: [Models.user_wallets]
        // });

        let user_details;

        if (!user_details) {
            return sendResponse(req, res, 401);
        }

        if (user_details.status != 1) {
            return sendResponse(req, res, 401, true, false, `Account Suspended!`);
        }

        if (!user_details.phone_verified) { // !user_details.user_wallet
            return sendResponse(req, res, 401, true, false, `Please verify your otp to continue.`);
        } else {
            next();
        }
    } catch (err) {
        console.log(err)
        return sendResponse(req, res, 500, err);
    }
}