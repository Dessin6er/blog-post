const mongoose = require("mongoose");
const Post = require("../model/PostModel");

const registerPost = async (req, res) => {
  // console.log(req.cookies);

  try {
    if (
      !req?.body?.title ||
      !req?.body?.image ||
      !req?.body?.content ||
      !req?.body?.author
    )
      return res.status(400).json({ error: " missing information" });
    const objectId = new mongoose.Types.ObjectId(req.body.author);
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      author: objectId,
    });
    // console.log(post);
    res.status(201).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errorMSG: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ err: error.message });
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOne({ _id: id }).populate("author", "username");

  // console.log(post);
  res.json(post);
};

const allowed = async (req, res) => {
  res.status(200).json("allowed");
};

module.exports = {
  registerPost,
  getPosts,
  allowed,
  getPostById,
};
