const { sendResponse } = require("../helpers/ResponseHelper");
const { Admin } = require("../database/models/Admin");

class AdminController {
    static async register(req, res) {
        try {
            let { firstname, lastname, email, phone } = req.body;

            const admin_details = await new Admin({
              firstname,
              lastname,
              email,
              phone,
            });

            await admin_details.save();

            if(admin_details) {
              sendResponse(req, res, 201, false, admin_details, "Admin created successfully");
            }
            
        } catch (error) {
            console.log(error);
            sendResponse(req, res, 500, error);
        }
    }
}

module.exports = AdminController;