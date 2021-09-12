const mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      min: 5,
      max: 1000,
    },
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const validationSchema = Joi.object({
  uid: Joi.string().required(),
  content: Joi.string().required().min(5).max(1000),
  numLikes: Joi.number().min(0),
});

module.exports = { commentSchema, validationSchema };
