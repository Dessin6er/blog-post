const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    min: 4,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
