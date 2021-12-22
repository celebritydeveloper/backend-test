// /**
//  *
//  * User Routes
//  */

const express = require("express");
const router = express.Router();
const AuthRouter = express.Router();

const UserController = require("../controller/UserController");
//const AuthController = require("../controllers/AuthenticationController");

//  const FileUpload = require("../helpers/FileUpload");

const Authentication = require("../middlewares/Authentication");
const Authorization = require("../middlewares/UserAuthorization");
const RateLimiter = require("../middlewares/RateLimiter");

const {
  validate,
  register_user,
  add_cart
} = require("../middlewares/Validators");

//  /**
//   * Routes for CART
//   */
AuthRouter.post("/cart/add", Authorization, validate(add_cart), UserController.addItem);
//router.post("/otp/verify", Authentication, validate(verify_otp), AuthController.verifyOTP);



//  /**
//   * Routes for user authentication
//   */

router.post("/register", RateLimiter.login, validate(register_user), UserController.register);

router.use("/", Authentication, Authorization, AuthRouter);

module.exports = router;
