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
  },
  {
    timestamps: true,
  }
);

const validationSchema = Joi.object({
  _id: Joi.string().optional(),
  uid: Joi.string().required(),
  content: Joi.string().required().min(5).max(1000),
  updatedAt: Joi.date().optional(),
  createdAt: Joi.date().optional(),
});

module.exports = { commentSchema, validationSchema };
