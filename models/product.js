const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "price must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: {
      values: ["fruits", "dairy", "snacks", "detergent"],
      message: `{VALUE} is not supported`,
    },
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    default: 4.9,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
