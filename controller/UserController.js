const { sendResponse } = require("../helpers/ResponseHelper");
const { User } = require("../database/models/User");
const { Cart } = require("../database/models/Cart");
const { Product } = require("../database/models/Product");

class UserController {
  static async register(req, res) {
    try {
      const { firstname, lastname, email, phone, password } = req.body;

      const check_details = await User.findOne({ email: email, phone: phone });

      if (check_details) {
        if (check_details.email === email) {
          return sendResponse(
            req,
            res,
            203,
            true,
            false,
            "Email already registered with a user."
          );
        } else if (check_details.phone === phone) {
          return sendResponse(
            req,
            res,
            203,
            true,
            false,
            "Phone already registered with a user."
          );
        } else if (
          check_details.phone === phone &&
          check_details.email === email &&
          check_details.phone_verified === false
        ) {
          return sendResponse(
            req,
            res,
            203,
            true,
            false,
            "Please verify your phone number."
          );
        } else {
          return sendResponse(
            req,
            res,
            203,
            true,
            false,
            "Phone already registered with an agent."
          );
        }
      }

      const md5 = require("md5");
      const otp = Math.floor(100000 + Math.random() * 900000);
      const bcrypt = require("bcryptjs");

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      const user_details = await new User({
        firstname,
        lastname,
        email,
        password,
        phone,
        otp,
        password_reset_token: md5(
          firstname + "" + email + "" + phone + "" + lastname
        ),
      });

      await user_details.save();

      if (user_details) {
        sendResponse(req, res, 201, false, user_details, "User created successfully");
      }
    } catch (error) {
      console.log(error);
      sendResponse(req, res, 500, error);
    }
  }

  static async addItem(req, res) {
    try {
      const { user, product_id, quantity } = req.body;
      const cart = await Cart.findOne({ user_id: user.user_id });
      const product = await Product.findOne({ _id: product_id });
      let user_type;

      if (user.user_type === process.env.USER_TYPE) {
        user_type = "user";
      } else {
        user_type = "admin";
      }

      const check_details = await User.findOne({ _id: user.user_id });

      if (!check_details)
        return sendResponse(req, res, 404, true, false, "User not found");
      if (!product)
        return sendResponse(req, res, 404, true, false, "Product not found");

      const price = product.price;
      const name = product.itemname;

      if (cart) {
        const itemIndex = cart.items.findIndex(
          (item) => item.product_id == product_id
        );
        //check if product exists or not
        if (itemIndex > -1) {
          let product = cart.items[itemIndex];
          product.quantity += quantity;

          cart.total = cart.items.reduce((acc, item) => {
            return acc + item.quantity * item.price;
          }, 0);

          cart.items[itemIndex] = product;
          await cart.save();
          sendResponse(req, res, 200, false, cart);
        } else {
          cart.items.push({ product_id, itemname: name, quantity, price });

          cart.total = cart.items.reduce((acc, item) => {
            return acc + item.quantity * item.price;
          }, 0);

          await cart.save();
          sendResponse(req, res, 200, false, cart, `Added Item to Cart`);
        }
      } else {
        //no cart exists, create one
        const cartItem = await Cart.create({
          user_id: user.user_id,
          items: [{ product_id, itemname: name, quantity, price }],
          total: quantity * price,
        });
        sendResponse(req, res, 201, false, cartItem, `Created new Cart`);
      }
    } catch (error) {
      console.log(error);
      sendResponse(req, res, 500, error);
    }
  }



  static async editItemQuantity(req, res) {
    try {
      const item_id = req.params.item_id;
      const { user, quantity } = req.body;

      const cart = await Cart.findOne({ user_id: user.user_id });
      const itemIndex = cart.items.findIndex((item) => item._id == item_id);

      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity = quantity;

        cart.total += item.quantity * item.price;
        if (cart.total < 0) {
          cart.total = 0;
        }
        cart.total = cart.items.reduce((acc, item) => {
          return acc + item.quantity * item.price;
        }, 0);

        await cart.save();

        sendResponse(req, res, 200, false, cart, "Item quantity updated");
      } else {
        sendResponse(req, res, 404, true, false, "Item not found");
      }
    } catch (error) {
      console.log(error);
      sendResponse(req, res, 500, error);
    }
  }



  static async deleteItem(req, res) {
    try {
      const item_id = req.params.item_id;
      const { user } = req.body;

      const cart = await Cart.findOne({ user_id: user.user_id });
      const productIndex = cart.items.findIndex((item) => item._id == item_id);

      if (productIndex > -1) {
        const item = cart.items[productIndex];
        cart.total -= item.quantity * item.price;
        if (cart.total < 0) {
          cart.total = 0;
        }
        cart.items.splice(productIndex, 1);
        cart.total = cart.items.reduce((acc, item) => {
          return acc + item.quantity * item.price;
        }, 0);
        cart = await cart.save();
        sendResponse(req, res, 200, false, cart, "Item deleted");
      } else {
        sendResponse(req, res, 404, true, false, "Item not found");
      }
    } catch (error) {
      console.log(error);
      sendResponse(req, res, 500, error);
    }
  }

  static async removeCart(req, res) {
    try {
      const cart_id = req.params.cart_id;
      const { user } = req.body;

      const cart = await Cart.findOne({ _id: cart_id });

      if (cart) {
        await Cart.findOneAndDelete(cart_id);
        sendResponse(req, res, 200, false, cart, "Cart deleted");
      } else {
        sendResponse(req, res, 404, true, false, "Cart not found");
      }
    } catch (error) {
      console.log(error);
      sendResponse(req, res, 500, error);
    }
  }
}

module.exports = UserController;
