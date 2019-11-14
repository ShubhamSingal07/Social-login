const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  role: String,
  googleId: String,
  facebookId: String,
  instagramId: String,
  thumbnail: String,
  strategy: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;
