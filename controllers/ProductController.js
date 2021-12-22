const { sendResponse } = require("../helpers/ResponseHelper");
const { logActivity } = require("../helpers/ActivityLogger");
const Product = require("../database/models/Product");

class ProductController {
    static async createProduct (req, res) {
        try {
            let { user, sku, itemname, price, stock, description, expiration_date } = req.body;
            let user_type;

            if (user.user_type === process.env.ADMIN_USER_TYPE) {
                user_type = "admin";
            } else {
                user_type = "user";
                return sendResponse(req, res, 401, true, false);
            }

            let product = await new Product({
                itemname,
                sku,
                price,
                stock,
                description,
                expiration_date,
            });

            await product.save();

            await logActivity("admin", admin_details._id, login._id, `Registered.`);
            
        } catch (error) {
            sendResponse(req, res, 500, error);
        }
    }
}

module.exports = ProductController;