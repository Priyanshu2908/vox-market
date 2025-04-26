
// Import the required modules
const { Schema, model, Types } = require('../connection');

// Define the product schema
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    seller: { type: Types.ObjectId, ref: 'sellerdata' },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,

    },
    category: {
      type: String,
      required: true,
      enum: ['electronics', 'clothing', 'books', 'home', 'toys'],
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
    },
    

  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);


// Create the Product model based on the schema

module.exports = model('products', productSchema);



