const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Drama" },
  { id: 4, name: "Thriller" },
];

const schema = {
  name: Joi.string().required().min(3).max(10),
};

const validateGenre = (genre) => {
  return Joi.validate(genre, schema);
};

router.get("/", (req, res) => {
  res.status(200).send(genres);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const genre = genres.find((g) => g.id === id);
  if (!genre) return res.status(404).send("Invalid ID");
  res.status(200).send(genre);
});

router.post("/", (req, res) => {
  const genre = req.body;
  const { error } = validateGenre(genre);
  if (error) res.status(400).send(error.details[0].message);

  genres.push({ id: genres.length + 1, name: genre.name });
  res.status(200).send(genre);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const genre = genres.find((g) => g.id === id);
  if (!genre) res.status(404).send("Invalid ID");
  const { error } = validateGenre(req.body);
  if (error) res.status(400).send(error.details[0].message);
  genre.name = req.body.name;
  res.status(200).send(genre);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const genre = genres.find((g) => g.id === id);
  if (!genres) return res.status(404).send("Invalid ID");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.status(200).send(genre);
});

module.exports = router;
