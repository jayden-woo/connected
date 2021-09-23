const mongoose = require("mongoose");
const Joi = require("joi");

const commentSchema = new mongoose.Schema(
  {
    author: {
      uid: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      picture: {
        type: String,
        required: true,
      },
    },
    content: {
      type: String,
      required: true,
      min: 5,
      max: 1000,
    },
  },
  {
    timestamps: true,
  }
);

const validationSchema = Joi.object({
  _id: Joi.string().optional(),
  author: Joi.object({
    uid: Joi.string().required(),
    name: Joi.string().required(),
    picture: Joi.string().required(),
  }),
  content: Joi.string().required().min(5).max(1000),
  updatedAt: Joi.date().optional(),
  createdAt: Joi.date().optional(),
});

module.exports = { commentSchema, validationSchema };
