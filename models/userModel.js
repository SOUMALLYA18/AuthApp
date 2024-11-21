const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  // Corrected from userSchame to userSchema
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema); // Correct variable name here as well
