const mongoose = require("mongoose");
const Joi = require("joi");
const genreSchema = require("./genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 50,
    },
    dailyRentalRate: {
      type: Number,
      require: true,
      min: 0,
      max: 50,
    },
  })
);

const validateMovie = (movie) => {
  const schema = {
    title: Joi.string().required().min(5).max(50),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().required().min(0).max(50),
    dailyRentalRate: Joi.number().required().min(0).max(50),
  };
  return Joi.validate(movie, schema);
};

exports.Movie = Movie;
exports.validate = validateMovie;
