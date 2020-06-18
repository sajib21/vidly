const mongoose = require("mongoose");
const Joi = require("joi");

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    isGold: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      minlength: 11,
      maxlength: 50,
    },
  })
);

const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().required().min(5).max(50),
    phone: Joi.string().required().min(11).max(50),
    isGold: Joi.boolean(),
  };
  return Joi.validate(customer, schema);
};

exports.Customer = Customer;
exports.validate = validateCustomer;
