const mongoose = require("mongoose");
const Joi = require("joi");
const { historySchema, historyValidationSchema } = require("./history");

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
    history: {
      type: [historySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const commentValidationSchema = Joi.object({
  _id: Joi.string().optional(),
  author: Joi.object({
    uid: Joi.string().required(),
    name: Joi.string().required(),
    picture: Joi.string().required(),
  }),
  content: Joi.string().required().min(5).max(1000),
  history: Joi.array().items(historyValidationSchema),
  updatedAt: Joi.date().optional(),
  createdAt: Joi.date().optional(),
});

module.exports = { commentSchema, commentValidationSchema };
