const mongoose = require("mongoose");
const commentSchema = require("./comment");

const postSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    min: 5,
    max: 100,
  },
  content: {
    type: String,
    required: true,
    min: 5,
    max: 1000,
  },
  creationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  numLikes: {
    type: Number,
    required: true,
    default: 0,
  },
  numComments: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  numViews: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  comments: [commentSchema],
});

const Post = mongoose.model("Posts", postSchema);

module.exports = { Post };
