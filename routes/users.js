const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");

// router.get("/", async (req, res) => {
//   const users = await User.find().sort("name");
//   res.status(200).send(users);
// });

// router.get("/:id", async (req, res) => {
//   const genre = await User.findById(req.params.id);
//   if (!genre) return res.status(404).send("Invalid ID");

//   res.status(200).send(genre);
// });

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user = await user.save();
  res.status(200).send(user);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const genre = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true,
    }
  );
  if (!genre) res.status(404).send("Invalid ID");

  res.status(200).send(genre);
});

router.delete("/:id", async (req, res) => {
  const genre = await User.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Invalid ID");
  res.status(200).send(genre);
});

router.delete("/", async (req, res) => {
  const genres = await User.remove();
  res.status(200).send(genres);
});

module.exports = router;
