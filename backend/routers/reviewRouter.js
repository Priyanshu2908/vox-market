// reviewRouter.js
const express = require('express');
const Review = require('../models/review'); // Assuming you have a Review model
const Product = require('../models/product'); // Assuming you have a Product model
const router = express.Router();

// Middleware to validate review data
const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;
  if (rating === undefined || !comment) {
    return res.status(400).json({ message: 'Rating and comment are required' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }
  next();
};

// Get all reviews for a product by product ID
router.get('/product/:productId', async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId }); // Fetch reviews for the specific product
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve reviews', error: err });
  }
});

// Get a single review by review ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id); // Fetch the review by its ID
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve review', error: err });
  }
});

// Add a new review for a product
router.post('/product/:productId', validateReview, async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newReview = new Review({
      product: productId,
      rating,
      comment,
      user: req.userId, // Assuming the user is authenticated and userId is passed in the request
    });

    await newReview.save(); // Save the new review to the database
    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create review', error: err });
  }
});

// Update an existing review by review ID
router.put('/:id', validateReview, async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { rating, comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update review', error: err });
  }
});

// Delete a review by review ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReview = await Review.findByIdAndDelete(id); // Remove the review from the database
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review', error: err });
  }
});

module.exports = router;
