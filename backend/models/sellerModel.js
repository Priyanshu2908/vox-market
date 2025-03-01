const mongoose = require('mongoose');

// Define the seller schema
const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    storeName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, // Basic email validation
    },
    phone: {
      type: String,
      required: true,
      match: /^[+]?[0-9]{10,15}$/, // Basic phone number validation
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
      },
    ],
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

// Create the Seller model based on the schema
const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
