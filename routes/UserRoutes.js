// /**
//  *
//  * User Routes
//  */

const express = require("express");
const router = express.Router();

const UserController = require("../controller/UserController");



const {
  validate,
  register_user,
  add_cart,
  update_item
} = require("../middlewares/Validators");

//  /**
//   * Routes for CART
//   */
router.post("/carts", validate(add_cart), UserController.addItem);
router.get('/carts', UserController.fetchItems);
router.put('/items/:item_id', validate(update_item), UserController.editItemQuantity);
router.delete('/items/:item_id', UserController.deleteItem);
router.delete('/carts/:cart_id', UserController.removeCart);
//router.post("/otp/verify", Authentication, validate(verify_otp), AuthController.verifyOTP);



//  /**
//   * Routes for user authentication
//   */

router.post("/", validate(register_user), UserController.register);



module.exports = router;
