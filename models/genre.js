const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().required().min(3).max(10),
  };
  return Joi.validate(genre, schema);
};

exports.genreSchrema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
