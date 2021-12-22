// /**
//  *
//  * User Routes
//  */

const express = require("express");
const router = express.Router();
const AuthRouter = express.Router();

const UserController = require("../controllers/UserController");
const AuthController = require("../controllers/AuthenticationController");

//  const FileUpload = require("../helpers/FileUpload");

const Authentication = require("../middlewares/Authentication");
const Authorization = require("../middlewares/UserAuthorization");
const RateLimiter = require("../middlewares/RateLimiter");

const {
  validate,
  register_user,
  login_user,
} = require("../middlewares/Validators");

//  /**
//   * Routes for MISC
//   */
//  AuthRouter.get("/home", UserController.getHomeData);


router.post("/otp/resend", RateLimiter.otp, Authentication, validate(resend_otp), AuthController.resendOTP);
router.post("/otp/verify", Authentication, validate(verify_otp), AuthController.verifyOTP);

//  /**
//   * Routes for user authentication
//   */

router.post("/register", RateLimiter.login, validate(register_user), UserController.register);

router.post("/login", RateLimiter.login, validate(login_user), AuthController.login);


//  /**
//   * Route Group for Admin Authenticated Routes
//   */

router.use("/", Authentication, Authorization, AuthRouter);

module.exports = router;
