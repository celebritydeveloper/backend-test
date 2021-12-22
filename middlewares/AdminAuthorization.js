"use strict";
const { sendResponse } = require("../helpers/ResponseHelper");
const Admin = require("../database/models/Admin");


//checks if admin is authorized on route
module.exports = (slug = []) => {
    return async (req, res, next)=>{
        try{
            if(req.body.user.user_type != process.env.ADMIN_USER_TYPE){
                return sendResponse(req,res, 401, true, false, `Unauthorized!`);
            }

            let admin_details = await Admin.findOne({ _id: req.body.user['user_id']  });


            if(!admin_details){
                return sendResponse(req,res, 401);
            }

            next()
            
        }
        catch(err){
            console.log(err)
            return sendResponse(req,res, 500,err);
        }
    }
}