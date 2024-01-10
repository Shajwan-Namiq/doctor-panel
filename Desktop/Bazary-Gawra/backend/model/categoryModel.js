const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
  },

  category: {
    type: String,
    required: [true, "Please enter category category"],
  },

  icon: {
    type: String,
    required: [true, "Please enter category icon"],
  },

  img: {
    type: String,
    required: [true, "Please enter category images"],
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
