const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  itemname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 1
  },
  expiration_date: {
    type: Date,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});

const Product = mongoose.model("Product", productSchema);


exports.Product = Product;
