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

  register_admin: [
    body("firstname").isString().trim(),
    body("lastname").isString().trim(),
    body("email").isEmail().normalizeEmail(),
    body("phone").isMobilePhone("en-NG"),
  ],

  register_user: [
    body("firstname").isString().trim(),
    body("email").isEmail().trim(),
    body("phone").isMobilePhone(),
    body("password").isString().isLength(8),
    body("lastname").isString().trim(),
  ],

  login_user: [body("customer").isString(), body("password").isString()],

  login_biometric_user: [body("phone").isString()],
  change_password: [
    body("old_password").isString(),
    body("new_password").isString().isLength(8),
  ],
 
  update_package_image: [body("image").isURL()],

};
