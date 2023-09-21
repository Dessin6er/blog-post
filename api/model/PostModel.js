const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = require("../model/UserModel");

const postSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },

  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
