// /**
//  *
//  * User Routes
//  */

const express = require("express");
const router = express.Router();
const AuthRouter = express.Router();

const AdminController = require("../controller/AdminController");
const ProductController = require("../controller/ProductController");
//const AuthController = require("../controllers/AuthenticationController");

//  const FileUpload = require("../helpers/FileUpload");

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
//   * Routes for MISC
//   */

AuthRouter.get('/product/all', ProductController.fetchProducts);
AuthRouter.post("/product/create", validate(create_product), ProductController.createProduct);
AuthRouter.put('/product/update/:product_id', validate(update_product), ProductController.updateProduct);
AuthRouter.delete('/product/remove/:product_id', ProductController.deleteProduct);


//router.post("/otp/resend", RateLimiter.otp, Authentication, validate(resend_otp), AuthController.resendOTP);
//router.post("/otp/verify", Authentication, validate(verify_otp), AuthController.verifyOTP);

//  /**
//   * Routes for user authentication
//   */

router.post("/register", RateLimiter.login, validate(register_admin), AdminController.register);

//router.post("/login", RateLimiter.login, validate(login_user), AuthController.login);


//  /**
//   * Route Group for Admin Authenticated Routes
//   */

router.use("/", Authentication, AuthRouter);

module.exports = router;
