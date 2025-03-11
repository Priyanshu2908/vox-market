const mongoose = require('mongoose');


// Define the product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'sellerdata' },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ['electronics', 'clothing', 'home', 'beauty', 'toys', 'sports'], // Example categories
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(ftp|http|https):\/\/[^ "]+$/.test(v); // Basic URL validation
        },
        message: 'Invalid image URL!',
      },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Product model based on the schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
