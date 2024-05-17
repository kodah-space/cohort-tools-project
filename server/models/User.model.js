const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { isAuthenticated } = require("./../middleware/jwt.middleware.js"); // <== IMPORT

const userSchema = new Schema({
  email: {
    type: String,
    unique: true, // Ensure email is unique
    required: true,
    trim: true, // Trims whitespace from the email
    lowercase: true, // Converts email to lowercase
    match: [/\S+@\S+\.\S+/, "is invalid"], // Validates email format
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true, // Trims whitespace from the name
  },
});

module.exports = model("User", userSchema);
