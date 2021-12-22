// /**
//  *
//  * Admin Routes
//  */

const express = require("express");
const router = express.Router();
const AuthRouter = express.Router();

const AdminController = require("../controller/AdminController");
const ProductController = require("../controller/ProductController");

const Authentication = require("../middlewares/Authentication");
const Authorization = require("../middlewares/AdminAuthorization");
const RateLimiter = require("../middlewares/RateLimiter");

const {
  validate,
  register_admin,
  create_product,
  update_product
} = require("../middlewares/Validators");

//  /**
//   * Routes for PRODUCT
//   */

AuthRouter.get('/product/all', Authorization, ProductController.fetchProducts);
AuthRouter.get('/product/:product_id', Authorization, ProductController.fetchSingleProduct);
AuthRouter.post("/product/create", Authorization, validate(create_product), ProductController.createProduct);
AuthRouter.put('/product/update/:product_id', Authorization, validate(update_product), ProductController.updateProduct);
AuthRouter.delete('/product/remove/:product_id', Authorization, ProductController.deleteProduct);



//  /**
//   * Routes for admin authentication
//   */

router.post("/register", RateLimiter.login, validate(register_admin), AdminController.register);


//  /**
//   * Route Group for Admin Authenticated Routes
//   */

router.use("/", Authentication, AuthRouter);

module.exports = router;
