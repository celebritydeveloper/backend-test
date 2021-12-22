const { sendResponse } = require("../helpers/ResponseHelper");
const { User } = require("../database/models/User");
const { UserLogin } = require("../database/models/UserLogin");
const { logActivity } = require("../helpers/ActivityLogger");
const { encrypt, decrypt } = require("../helpers/Encryption");

class UserController {
    static async register(req, res) {
        try {
            let { firstname, lastname, email, phone, password } = req.body;

            let check_details = await User.findOne({ email: email, phone: phone  });

            if (check_details) {
                if (check_details.email === email) {
                  return sendResponse(req, res, 203, true, false, "Email already registered with a user.");
                } else if (check_details.phone === phone) {
                  return sendResponse(req, res, 203, true, false, "Phone already registered with a user.");
                } else if (check_details.phone === phone && check_details.email === email && check_details.phone_verified === false) {
                  return sendResponse(req, res, 203, true, false, "Please verify your phone number.");
                } else {
                  return sendResponse(req, res, 203, true, false, "Phone already registered with an agent.");
                }
            }

            const md5 = require("md5");
            const otp = Math.floor(100000 + Math.random() * 900000);
            const bcrypt = require("bcryptjs");

            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);

            let user_details = await new User({
              firstname,
              lastname,
              email,
              password,
              phone,
              otp,
              password_reset_token: md5(
                firstname + "" + email + "" + phone + "" + lastname
              ),
            });

            await user_details.save();

            if(user_details) {
                const { getLoginData } = require("../helpers/LoginData");

                let login_data = await getLoginData(req);
                login_data.user_id = user_details._id;
                login_data.details = "Created a user account"

                let login = await new UserLogin(login_data);
                await login.save();

                let jwt_payload = {
                    user_id: encrypt(user_details._id.toString()),
                    user_type: encrypt(process.env.USER_TYPE.toString()),
                    login: encrypt(login.id.toString()),
                };

                const JWT = require("jsonwebtoken");

                let authorization = JWT.sign(jwt_payload, process.env.JWT_SECRET);
                user_details["authorization"] = authorization;
                console.log(user_details.authorization);

                let user = {
                  user_details,
                  authorization
                }

                console.log(user_details);

                await logActivity("user", user_details._id, login._id, `Registered.`);
                sendResponse(req, res, 201, false, user, "User created successfully");
            }
            
        } catch (error) {
            console.log(error);
            sendResponse(req, res, 500, error);
        }
    }
}

module.exports = UserController;