const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
  },
  color: {
    type: String,
    required: [true, "Please enter product color"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please enter product category"],
  },
  subCategory: {
    type: String,
    required: [true, "Please enter product sub category"],
  },

  price: {
    type: String,
    required: [true, "Please enter product price"],
    min: [0, "Price cannot be less than 0"],
  },
  brand: {
    type: String,
    required: [true, "Please enter product brand name"],
  },

  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  inStock: { type: Boolean, required: [true, "Please enter product in stock"] },
  quantity: {
    type: Number,
    required: [true, "Please enter product quantity"],
    min: [1, "quantity cannot be less than 1"],
  },

  images: {
    type: [String],
    required: [true, "Please enter product images"],
    validate: [(images) => images.length >= 3, "Images cannot be less than 3"],
    maxlength: [5, "Images cannot be more than 5"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("Product", productSchema);
