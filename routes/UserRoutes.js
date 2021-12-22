// /**
//  *
//  * User Routes
//  */

const express = require("express");
const router = express.Router();
const AuthRouter = express.Router();

const UserController = require("../controller/UserController");

const Authentication = require("../middlewares/Authentication");
const Authorization = require("../middlewares/UserAuthorization");
const RateLimiter = require("../middlewares/RateLimiter");

const {
  validate,
  register_user,
  add_cart,
  update_item
} = require("../middlewares/Validators");

//  /**
//   * Routes for CART
//   */
AuthRouter.post("/cart/add", validate(add_cart), UserController.addItem);
AuthRouter.put('/item/update/:item_id', validate(update_item), UserController.editItemQuantity);
AuthRouter.delete('/item/:item_id/remove', UserController.deleteItem);
AuthRouter.delete('/cart/:cart_id', UserController.removeCart);
//router.post("/otp/verify", Authentication, validate(verify_otp), AuthController.verifyOTP);



//  /**
//   * Routes for user authentication
//   */

router.post("/register", RateLimiter.login, validate(register_user), UserController.register);

router.use("/", Authentication, Authorization, AuthRouter);

module.exports = router;
