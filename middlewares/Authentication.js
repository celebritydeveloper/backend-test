const jwt = require('jsonwebtoken');
const { sendResponse } = require('../helpers/ResponseHelper');
const { decrypt } = require('../helpers/Encryption');

module.exports = (req, res, next) => {
    try {
        let auth = req.headers['authorization'] ? req.headers['authorization'] : req.headers['Authorization'];
        let token = auth && auth.split(" ").length === 2 ? auth.split(" ")[1] : null;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (!err) {
                    let user = decoded;
                    if (user && user.user_id && user.user_type) {
                        user.user_id = decrypt(user.user_id);
                        user.login = decrypt(user.login);
                        user.user_type = decrypt(user.user_type);
                        req.body['user'] = user;
                        next();
                    } else {
                        sendResponse(req,res, 401);
                    }
                } else {
                    sendResponse(req,res, 401);
                }
            });
        } else {
            sendResponse(req,res,401);
        }
    } catch (e) {
        sendResponse(req, res, 500,e);
    }
};