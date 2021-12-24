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
  create_product,
  update_product
} = require("../middlewares/Validators");

//  /**
//   * Routes for PRODUCT
//   */

router.get('/products', ProductController.fetchProducts);
router.get('/products/:product_id', ProductController.fetchSingleProduct);
router.post("/products", validate(create_product), ProductController.createProduct);
router.put('/products/:product_id', validate(update_product), ProductController.updateProduct);
router.delete('/products/:product_id', ProductController.deleteProduct);




module.exports = router;
