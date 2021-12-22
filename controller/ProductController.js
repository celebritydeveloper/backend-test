const { sendResponse } = require("../helpers/ResponseHelper");
const { logActivity } = require("../helpers/ActivityLogger");
const { Product } = require("../database/models/Product");

class ProductController {
    static async createProduct (req, res) {
        try {
            let { user, itemname, price, stock, description, expiration_date } = req.body;
            let user_type;
            const randomstring = require("randomstring");
            let sku = randomstring.generate(10);

            if (user.user_type === process.env.ADMIN_USER_TYPE) {
                user_type = "admin";
            } else {
                user_type = "user";
                return sendResponse(req, res, 401, true, false);
            }

            let product = await new Product({
                itemname,
                sku: sku,
                price,
                stock,
                description,
                expiration_date,
            });

            await product.save();

            await logActivity(user_type, user.user_id, user.login, `Created a new Prodcut.`);
            sendResponse(req, res, 201, false, product, "Product created successfully");
            
        } catch (error) {
            console.log(error);
            sendResponse(req, res, 500, error);
        }
    }



    static async fetchProducts (req, res) {
        try {
            let { user  } = req.body;

            let user_type;

            if (user.user_type === process.env.ADMIN_USER_TYPE) {
                user_type = "admin";
            } else {
                user_type = "user";
                return sendResponse(req, res, 401, true, false);
            }

            let product = await Product.find();
            sendResponse(req, res, 200, false, product, "Product Fetched successfully");
            
        } catch (error) {
            console.log(error);
            sendResponse(req, res, 500, error);
        }
    }

    static async fetchSingleProduct (req, res) {
        try {
            let product_id = req.params.product_id;
            let { user  } = req.body;
            let user_type;

            if (user.user_type === process.env.ADMIN_USER_TYPE) {
                user_type = "admin";
            } else {
                user_type = "user";
                return sendResponse(req, res, 401, true, false);
            }

            let product = await Product.findById(product_id);
            sendResponse(req, res, 200, false, product, "Product Fetched successfully");
        } catch (error) {
            console.log(error);
            sendResponse(req, res, 500, error);
        }
    }


    static async updateProduct (req, res) {
        try {
            let product_id = req.params.product_id
            let { user, itemname, price, stock, description, expiration_date } = req.body;
            let user_type;

            if (user.user_type === process.env.ADMIN_USER_TYPE) {
                user_type = "admin";
            } else {
                user_type = "user";
                return sendResponse(req, res, 401, true, false);
            }

            let product = await Product.findById(product_id);

            await Product.findOneAndUpdate(product._id, {
                $set: {
                    itemname,
                    price,
                    stock,
                    description,
                    expiration_date
                },
                new: true,
            });

            await logActivity(user_type, user.user_id, user.login, `Updated Product. ${product}`);
            sendResponse(req, res, 200, false, product, "Product Updated successfully");
            
        } catch (error) {
            console.log(error);
            sendResponse(req, res, 500, error);
        }
    }


    static async deleteProduct (req, res) {
        try {
            let product_id = req.params.product_id
            let { user } = req.body;
            let user_type;

            if (user.user_type === process.env.ADMIN_USER_TYPE) {
                user_type = "admin";
            } else {
                user_type = "user";
                return sendResponse(req, res, 401, true, false);
            }

            let product = await Product.findById(product_id);

            console.log(product);

            await Product.findOneAndRemove(product._id)

            await logActivity(user_type, user.user_id, user.login, `Deleted Product. ${product}`);
            sendResponse(req, res, 200, false, product, "Product deleted successfully");
            
        } catch (error) {
            console.log(error);
            sendResponse(req, res, 500, error);
        }
    }
}

module.exports = ProductController;