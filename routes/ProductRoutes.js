// /**
//  *
//  * Product Routes
//  */

const express = require("express");
const router = express.Router();

const ProductController = require("../controller/ProductController");


const {
  validate,
  create_product,
  update_product
} = require("../middlewares/Validators");

//  /**
//   * Routes for PRODUCT
//   */

router.get('/', ProductController.fetchProducts);
router.get('/:product_id', ProductController.fetchSingleProduct);
router.post("/", validate(create_product), ProductController.createProduct);
router.put('/:product_id', validate(update_product), ProductController.updateProduct);
router.delete('/:product_id', ProductController.deleteProduct);




module.exports = router;
