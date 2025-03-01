const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming you have a 'User' model
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', // Assuming you have a 'Product' model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
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
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'paypal', 'bank_transfer'],
      required: true,
    },
    status: {
      type: String,
      enum: ['processing', 'shipped', 'delivered', 'canceled'],
      default: 'processing',
    },
    placedAt: {
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

// Create the Order model based on the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
