const { sendResponse } = require("../helpers/ResponseHelper");
const { Admin } = require("../database/models/Admin");
const { UserLogin } = require("../database/models/UserLogin");
const { logActivity } = require("../helpers/ActivityLogger");
const { encrypt, decrypt } = require("../helpers/Encryption");

class AdminController {
    static async register(req, res) {
        try {
            let { firstname, lastname, email, phone, admin_type } = req.body;
            const randomstring = require("randomstring");
            let genPassword = randomstring.generate(8);

            let check_details = await Admin.findOne({ email: email });

            //if (check_details.email == email) return sendResponse(req, res, 203, true, false, "Email already registered with a user.");
                
        

            const md5 = require("md5");
            const otp = Math.floor(100000 + Math.random() * 900000);
            const bcrypt = require("bcryptjs");

            const salt = await bcrypt.genSalt(10);
            genPassword = await bcrypt.hash(genPassword, salt);

            let admin_details = await new Admin({
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
                const { getLoginData } = require("../helpers/LoginData");

                let login_data = await getLoginData(req);
                login_data.user_id = admin_details._id;
                login_data.details = "Created a user account"

                let login = await new UserLogin(login_data);
                await login.save();

                let jwt_payload = {
                    user_id: encrypt(admin_details._id.toString()),
                    user_type: encrypt(process.env.ADMIN_USER_TYPE.toString()),
                    login: encrypt(login.id.toString()),
                };

                const JWT = require("jsonwebtoken");

                let authorization = JWT.sign(jwt_payload, process.env.JWT_SECRET);
                admin_details["authorization"] = authorization;

                let admin = {
                  admin_details,
                  authorization
                }

                console.log(admin_details);

                await logActivity("admin", admin_details._id, login._id, `Registered.`);
                sendResponse(req, res, 201, false, admin, "Admin created successfully");
            }
            
        } catch (error) {
            console.log(error);
            sendResponse(req, res, 500, error);
        }
    }
}

module.exports = AdminController;