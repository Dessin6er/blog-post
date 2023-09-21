const mongoose = require("mongoose");
const Comment = require("../model/CommentModel");

const addComment = async (req, res) => {
  // console.log(req.cookies);

  try {
    if (!req?.body?.text || !req?.body?.author || !req?.body?.postId)
      return res.status(400).json({ error: " missing information" });

    const objectId1 = new mongoose.Types.ObjectId(req.body.author);
    const objectId2 = new mongoose.Types.ObjectId(req.body.postId);
    const comment = await Comment.create({
      text: req.body.text,
      author: objectId1,
      postId: objectId2,
    });
    // console.log("server: ", comment);
    res.status(201).json(comment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errorMSG: error.message });
  }
};

const getComments = async (req, res) => {
  const postId = req.params.id;

  if (!postId) return res.status(400).json({ error: " missing information" });

  try {
    const id = new mongoose.Types.ObjectId(postId);
    const comments = await Comment.find({ postId: id })
      .populate("author", ["username"])
      .sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ err: error.message });
  }
};
const deleteComment = async (req, res) => {
  const postId = req.params.id;

  if (!postId) return res.status(400).json({ error: " missing information" });

  try {
    const id = new mongoose.Types.ObjectId(postId);
    const comments = await Comment.deleteOne({ _id: id });

    res.status(200).json(comments);
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ err: error.message });
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};
