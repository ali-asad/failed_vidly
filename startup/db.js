const mongoose = require('mongoose');
const winston = require ('winston');


module.exports = function (){
//connecting the application with mongoDB
mongoose.connect('mongodb://localhost/vidly')
  .then(() => winston.info('Connected to mongodb://localhost/vidly...'));
}