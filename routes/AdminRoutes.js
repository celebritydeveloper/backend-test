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

AuthRouter.get('/product/all', ProductController.fetchProducts);
AuthRouter.get('/product/:product_id', ProductController.fetchSingleProduct);
AuthRouter.post("/product/create", validate(create_product), ProductController.createProduct);
AuthRouter.put('/product/update/:product_id', validate(update_product), ProductController.updateProduct);
AuthRouter.delete('/product/remove/:product_id', ProductController.deleteProduct);



//  /**
//   * Routes for admin authentication
//   */

router.post("/register", RateLimiter.login, validate(register_admin), AdminController.register);


//  /**
//   * Route Group for Admin Authenticated Routes
//   */

router.use("/", Authentication, Authorization, AuthRouter);

module.exports = router;
