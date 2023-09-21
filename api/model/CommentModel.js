const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = require("../model/UserModel");
const Post = require("../model/PostModel");

const commentSchema = Schema({
  text: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
