const express = require("express");
const router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");

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

router.get("/", async (req, res) => {
  const customer = await Customer.find().sort("name");
  res.status(200).send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send("Invalid ID");

  res.status(200).send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.status(200).send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, isGold: req.body.isGold, phone: req.body.phone },
    { new: true }
  );
  if (!customer) res.status(404).send("Invalid ID");
  res.status(200).send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Invalid ID");
  res.status(200).send(customer);
});

router.delete("/", async (req, res) => {
  const customer = await Customer.remove();
  res.status(200).send(customer);
});

module.exports = router;
