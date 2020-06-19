const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");
const { Rental, validate } = require("../models/rental");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");

Fawn.init(mongoose);

router.get("/", async (req, res) => {
  const rentals = await Rentals.find().sort("-dateOut");
  res.status(200).send(rentals);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send("Invalid ID");

  res.status(200).send(rental);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie.");

  if (movie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      //FIXME: isGold is in schema but not provided. fix it!
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  try {
    new Fawn.Task()
      .save("rentals", rental)
      .update(
        "movies",
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();
  } catch (er) {
    return res.status(500).send("Internal Server Failed.");
  }
  // rental = await rental.save();
  // movie.numberInStock--;
  // movie.save();

  res.status(200).send(rental);
});

// router.delete("/:id", async (req, res) => {
//   const movie = await Movie.findByIdAndRemove(req.params.id);
//   if (!movie) return res.status(404).send("Invalid ID");
//   res.status(200).send(movie);
// });

// router.delete("/", async (req, res) => {
//   const movie = await Movie.remove();
//   res.status(200).send(movie);
// });

module.exports = router;
