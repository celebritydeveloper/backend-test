const { sendResponse } = require("../helpers/ResponseHelper");

class AdminController {
    static async register(req, res) {
        try {
            
            
        } catch (error) {
            sendResponse(req, res, 500, error);
        }
    }
}

module.exports = AdminController;