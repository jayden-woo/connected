const mongoose = require("mongoose");
const Joi = require("joi");
const { commentSchema, validationSchema } = require("./comment");

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
  numViews: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  solved: {
    type: Boolean,
    required: true,
    default: false,
  },
  comments: [commentSchema],
});

const Post = mongoose.model("Posts", postSchema);

function validatePost(post, update = false) {
  const creationSchema = Joi.object({
    uid: Joi.string().required(),
    title: Joi.string().required().min(5).max(100),
    content: Joi.string().required().min(5).max(1000),
  });

  const updateSchema = Joi.object({
    uid: Joi.string(),
    title: Joi.string().min(5).max(100),
    content: Joi.string().min(5).max(1000),
    numLikes: Joi.number().min(0),
    numViews: Joi.number().min(0),
    solved: Joi.boolean(),
    comments: Joi.array().items(validationSchema),
  });

  if (update) return updateSchema.validate(post);

  return creationSchema.validate(post);
}

exports.Post = Post;
exports.validate = validatePost;
