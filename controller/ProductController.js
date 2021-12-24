const { sendResponse } = require("../helpers/ResponseHelper");
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

            const product = await new Product({
                itemname,
                sku: sku,
                price,
                stock,
                description,
                expiration_date,
            });

            await product.save();
            return sendResponse(req, res, 201, false, product, "Product created successfully");
            
        } catch (error) {
            console.log(error);
            return sendResponse(req, res, 500, error);
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

            const product = await Product.find();
            return sendResponse(req, res, 200, false, product, "Product Fetched successfully");
            
        } catch (error) {
            console.log(error);
            return sendResponse(req, res, 500, error);
        }
    }

    static async fetchSingleProduct (req, res) {
        try {
            const product_id = req.params.product_id;
            const { user  } = req.body;
            let user_type;

            if (user.user_type === process.env.ADMIN_USER_TYPE) {
                user_type = "admin";
            } else {
                user_type = "user";
                return sendResponse(req, res, 401, true, false);
            }

            const product = await Product.findById({_id: product_id});
            return sendResponse(req, res, 200, false, product, "Product Fetched successfully");
        } catch (error) {
            console.log(error);
            return sendResponse(req, res, 500, error);
        }
    }


    static async updateProduct (req, res) {
        try {
            const product_id = req.params.product_id
            const { user, itemname, price, stock, description, expiration_date } = req.body;
            let user_type;

            if (user.user_type === process.env.ADMIN_USER_TYPE) {
                user_type = "admin";
            } else {
                user_type = "user";
                return sendResponse(req, res, 401, true, false);
            }

            const product = await Product.findById(product_id);

            await Product.findByIdAndUpdate(product._id, {
                $set: {
                    itemname,
                    price,
                    stock,
                    description,
                    expiration_date
                },
                new: true,
            });
            return sendResponse(req, res, 200, false, product, "Product Updated successfully");
            
        } catch (error) {
            console.log(error);
            return sendResponse(req, res, 500, error);
        }
    }


    static async deleteProduct (req, res) {
        try {
            const product_id = req.params.product_id
            const { user } = req.body;
            let user_type;

            if (user.user_type === process.env.ADMIN_USER_TYPE) {
                user_type = "admin";
            } else {
                user_type = "user";
                return sendResponse(req, res, 401, true, false);
            }

            const product = await Product.findByIdAndDelete({_id: product_id});

            if(product) {
                return sendResponse(req, res, 200, false, product, "Product deleted successfully");
            }

        } catch (error) {
            console.log(error);
            return sendResponse(req, res, 500, error);
        }
    }
}

module.exports = ProductController;