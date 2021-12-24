const { sendResponse } = require("../helpers/ResponseHelper");
const { Admin } = require("../database/models/Admin");
const { UserLogin } = require("../database/models/UserLogin");

class AdminController {
    static async register(req, res) {
        try {
            let { firstname, lastname, email, phone, admin_type } = req.body;
            const randomstring = require("randomstring");
            let genPassword = randomstring.generate(8);

            const check_details = await Admin.findOne({ email: email });

            //if (check_details.email == email) return sendResponse(req, res, 203, true, false, "Email already registered with a user.");
                
        

            const md5 = require("md5");
            const otp = Math.floor(100000 + Math.random() * 900000);
            const bcrypt = require("bcryptjs");

            const salt = await bcrypt.genSalt(10);
            genPassword = await bcrypt.hash(genPassword, salt);

            const admin_details = await new Admin({
              firstname,
              lastname,
              email,
              password: genPassword,
              phone,
              otp,
              admin_type,
              password_reset_token: md5(
                firstname + "" + email + "" + phone + "" + lastname + "" + admin_type
              ),
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