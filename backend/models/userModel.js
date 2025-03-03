const bcrypt = require('bcryptjs'); // For hashing passwords
const { Schema, model } = require('../connection');

// Define the user schema
const userSchema = new Schema(
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
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum password length
    },
    phone: {
      type: String,
      match: /^[+]?[0-9]{10,15}$/, // Basic phone number validation
    },
    isAdmin: {
      type: Boolean,
      default: false, // To distinguish between normal users and admin users
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

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
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
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model based on the schema

module.exports = model('users', userSchema);
