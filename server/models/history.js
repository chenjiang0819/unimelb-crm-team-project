const mongoose = require("mongoose");
const Joi = require("joi");

const historySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 5,
      max: 100,
    },
    content: {
      type: String,
      min: 5,
      max: 1000,
    },
  },
  {
    timestamps: true,
  }
);

const historyValidationSchema = Joi.object({
  _id: Joi.string().optional(),
  title: Joi.string().optional().min(5).max(1000),
  content: Joi.string().optional().min(5).max(1000),
  updatedAt: Joi.date().optional(),
  createdAt: Joi.date().optional(),
});

module.exports = { historySchema, historyValidationSchema };
