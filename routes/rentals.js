const {Rental, validate} = require('../models/rental'); 
const {Movie} = require('../models/movie'); 
const {Customer} = require('../models/customer'); 
const fawn = require('fawn'); //Class to perform two phase commits
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn/lib/fawn');
const router = express.Router();

Fawn.init(mongoose);   //initislize method 

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  //Two-phase commit to peform group of actions together 
  // impleting Fawn here to decrement movies in stock
  try {
    new Fawn.Task()
      .save('rentals' , rental)                 //save method
      .update('movies' , {_id: movie._id} , {   //update method
      $inc: {numberInStock: -1}
    })
    .run();
  
    res.send(rental);
    }
    catch(ex){
      res.status(500).send('Something failed..');
    }
  });

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 