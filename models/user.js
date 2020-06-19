const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

const validateUser = (user) => {
  const schema = {
    name: Joi.string().required().min(5).max(50),
    email: Joi.string().required().email().min(5).max(50),
    password: Joi.string().required().min(5).max(1024),
  };
  return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;
