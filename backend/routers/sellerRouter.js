// sellerRouter.js
const express = require('express');
const Seller = require('../models/seller'); // Assuming you have a Seller model
const Product = require('../models/product'); // Assuming you have a Product model
const Order = require('../models/order'); // Assuming you have an Order model
const bcrypt = require('bcryptjs');
const router = express.Router();

// Middleware to validate seller data
const validateSeller = (req, res, next) => {
  const { name, email, password, shopName } = req.body;
  if (!name || !email || !password || !shopName) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  next();
};

// Register a new seller
router.post('/register', validateSeller, async (req, res) => {
  const { name, email, password, shopName } = req.body;

  try {
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ message: 'Seller already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name,
      email,
      password: hashedPassword,
      shopName,
    });

    await newSeller.save(); // Save the seller to the database
    res.status(201).json({ message: 'Seller registered successfully', seller: newSeller });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register seller', error: err });
  }
});

// Seller login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(400).json({ message: 'Seller not found' });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return seller data excluding the password
    res.status(200).json({
      message: 'Login successful',
      seller: { id: seller._id, name: seller.name, email: seller.email, shopName: seller.shopName },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err });
  }
});

// Get seller profile
router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await Seller.findById(id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    res.status(200).json(seller);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve seller profile', error: err });
  }
});

// Update seller profile
router.put('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, shopName } = req.body;

  try {
    const updatedSeller = await Seller.findByIdAndUpdate(
      id,
      { name, email, shopName },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({ message: 'Seller profile updated', seller: updatedSeller });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update seller profile', error: err });
  }
});

// Get all products of a seller
router.get('/:id/products', async (req, res) => {
  const { id } = req.params;

  try {
    const products = await Product.find({ seller: id }); // Fetch products by seller ID
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve seller products', error: err });
  }
});

// Get all orders for a seller
router.get('/:id/orders', async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await Order.find({ seller: id }); // Fetch orders by seller ID
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this seller' });
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve seller orders', error: err });
  }
});

// Update product details
router.put('/:id/products/:productId', async (req, res) => {
  const { id, productId } = req.params;
  const { name, description, price, stock, category } = req.body;

  try {
    const product = await Product.findOne({ _id: productId, seller: id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or you do not have permission to update it' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, description, price, stock, category },
      { new: true }
    );

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err });
  }
});

// Delete a product
router.delete('/:id/products/:productId', async (req, res) => {
  const { id, productId } = req.params;

  try {
    const product = await Product.findOne({ _id: productId, seller: id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or you do not have permission to delete it' });
    }

    await Product.findByIdAndDelete(productId); // Delete the product
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err });
  }
});

module.exports = router;
