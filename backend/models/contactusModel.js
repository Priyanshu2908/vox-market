const bcrypt = require('bcryptjs'); // For hashing passwords
const { Schema, model } = require('../connection');

// Define the contactus schema
const contactusSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    message: {
      type: String,
      required: true,
       // Minimum password length
    },
    phone: {
      type: String,
      match: /^[+]?[0-9]{10,15}$/, // Basic phone number validation
    },
    isAdmin: {
      type: Boolean,
      default: false, // To distinguish between normal contactuss and admin contactuss
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

// Hash the password before saving the contactus document
contactusSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified or new

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare hashed password with the input password during login
contactusSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the contactus model based on the schema

module.exports = model('contactuss', contactusSchema);
