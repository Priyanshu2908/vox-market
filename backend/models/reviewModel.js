const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Reference to the Product model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // Rating must be between 1 and 5
    },
    reviewText: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
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

// Create the Review model based on the schema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
