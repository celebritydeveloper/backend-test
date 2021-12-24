"use strict";
const { body, query, validationResult } = require("express-validator");
const { sendResponse } = require("../helpers/ResponseHelper");

module.exports = {
  validate(values = []) {
    return async (req, res, next) => {
      await Promise.all(values.map((value) => value.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      let _errors = errors.array();
      let message = "Invalid parameters:";

      _errors.forEach((v) => {
        message += ` ${v.param},`;
      });

      sendResponse(req, res, 403, errors.array(), false, message);
    };
  },

  create_product: [
    body("itemname").isString().trim(),
    body("price").isInt(),
    body("stock").isInt(),
  ],

  update_product: [
    body("itemname").isString().trim(),
    body("price").isInt(),
    body("stock").isInt(),
  ],

  update_item: [
    body("quantity").isInt(),
  ],

  add_cart: [
    body("user").isString().trim(),
    body("product_id").isString().trim(),
    body("quantity").isInt(),
  ],

  register_user: [
    body("firstname").isString().trim(),
    body("email").isEmail().trim(),
    body("phone").isMobilePhone("en-NG"),
    body("password").isString().isLength(8),
    body("lastname").isString().trim(),
  ],
  
};
