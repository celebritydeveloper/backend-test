// /**
//  *
//  * Admin Routes
//  */

const express = require("express");
const router = express.Router();

const AdminController = require("../controller/AdminController");
const ProductController = require("../controller/ProductController");


const {
  validate,
  register_admin,
  create_product,
  update_product
} = require("../middlewares/Validators");

//  /**
//   * Routes for PRODUCT
//   */

router.get('/products', ProductController.fetchProducts);
router.get('/product/:product_id', ProductController.fetchSingleProduct);
router.post("/product", validate(create_product), ProductController.createProduct);
router.put('/product/:product_id', validate(update_product), ProductController.updateProduct);
router.delete('/product/:product_id', ProductController.deleteProduct);



//  /**
//   * Routes for admin authentication
//   */

router.post("/register", validate(register_admin), AdminController.register);



module.exports = router;
