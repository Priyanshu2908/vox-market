// productRouter.js
const express = require('express');
const Product = require('../models/product'); // Assuming you have a Product model
const router = express.Router();

// Middleware to validate product data
const validateProduct = (req, res, next) => {
  const { name, price, description, category } = req.body;
  if (!name || !price || !description || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  next();
};

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve products', error: err });
  }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id); // Fetch product by ID
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve product', error: err });
  }
});

// Add a new product
router.post('/', validateProduct, async (req, res) => {
  const { name, price, description, category } = req.body;
  try {
    const newProduct = new Product({
      name,
      price,
      description,
      category,
    });

    await newProduct.save(); // Save the new product to the database
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create product', error: err });
  }
});

// Update an existing product by ID
router.put('/:id', validateProduct, async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, description, category },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id); // Remove product from database
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err });
  }
});

module.exports = router;
